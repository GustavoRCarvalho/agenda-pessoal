<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { transformImage, verifyCEP } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import { peopleValidation } from '@/utils/validations'
import { debounce } from 'lodash'
import { useListsStore } from '@/stores/lists'
import { useAlertsStore } from '@/stores/alerts'
import photoService from '@/api/photo'
import peopleService from '@/api/people'
import InputSelect from '../inputs/InputSelect.vue'
import { optionsCountries } from '@/utils/constants'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const ListsStore = useListsStore()
const { setPeople } = ListsStore
const { photos } = storeToRefs(ListsStore)

const ModalsStore = useModalsStore()
const { peopleSwitch } = ModalsStore
const { peopleModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetPeopleRegisterEdit } = RegisterStore
const { peopleRegisterEdit } = storeToRefs(RegisterStore)

const formValues = reactive({ ...peopleRegisterEdit.value })
const formErrors = reactive({})

// Limpa o erro caso quando o campo é alterado
// OBS: preferencialmente deve haver um watch para cada campo com verificação customizada
watch(
  () => formValues.cpf,
  () => {
    if (formErrors.cpf) {
      formErrors.cpf = null
    }
  },
)

// Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => peopleRegisterEdit.value,
  (newVal) => {
    Object.assign(formValues, newVal)
    formValues.foto = newVal.foto
    formValues.foto.src = photos.value[newVal.id] || ''
  },
)

// Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => peopleModal.value,
  (newVal) => {
    if (!newVal) {
      resetPeopleRegisterEdit()
    }
  },
)

// Verifica o cep para preencher automaticamente os campos durante a execução
// e adiciona ou remove o erro dependendo da função
// Faz debounce pois verifyCEP possui uma chamada fetch
watch(
  () => formValues.endereco.cep,
  debounce(async (cep) => {
    const newValues = await verifyCEP(cep)

    if (!newValues?.erro) {
      formValues.endereco.paisOption = formValues.endereco.paisOption.key
        ? formValues.endereco.paisOption
        : { key: 'BR', label: 'Brasil' }
      formValues.endereco.estado = formValues.endereco.estado || newValues.estado
      formValues.endereco.cidade = formValues.endereco.cidade || newValues.localidade
      formValues.endereco.bairro = formValues.endereco.bairro || newValues.bairro
      formValues.endereco.logradouro = formValues.endereco.logradouro || newValues.logradouro
      formErrors['cep'] = null
    } else {
      formErrors['cep'] = 'CEP não encontrado'
    }
  }, 300),
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formValues, peopleRegisterEdit.value)
  formValues.foto.data = {}
  formValues.foto.src = ''
}

async function handleFile(e) {
  const file = e.target.files[0]
  if (!file || !['image/png', 'image/jpeg'].includes(file.type)) {
    // event Error
    createAlertError('Imagens devem ser no formato .PNG ou .JPEG')
    return
  }
  formValues.foto.data = file
  formValues.foto.size = file.size
  formValues.foto.type = file.type

  try {
    formValues.foto.src = await transformImage(file)
    formValues.foto.src = `data:${file?.type};base64,` + formValues.foto.src
  } catch (e) {
    if (e.status === 404 || e?.response?.data?.message) {
      createAlertError('Erro ao processar a imagem!')
    }
    createAlertError(e?.response?.data?.message)
  }
}

async function handleSubmit(e) {
  e.preventDefault()

  if (!peopleValidation({ values: formValues, errors: formErrors })) {
    return
  }

  try {
    const response = await peopleService.postPeople(formValues)
    createAlertSucess(`Sucesso ao salvar a pessoa.`)

    if (formValues.foto?.size && response.data.object.id) {
      try {
        await photoService.postPhoto(response.data.object.id, formValues.foto.data)

        createAlertSucess(`Sucesso ao fazer upload da foto.`)
      } catch (e) {
        console.error(e)
        if (e.status === 404 || !e?.response?.data?.message) {
          createAlertError('Erro ao fazer upload da foto!')
        }
        createAlertError(e?.response?.data?.message)
      }
    }

    setPeople()
    peopleSwitch()
  } catch (e) {
    if (e.status === 404 || e?.response?.data?.message) {
      createAlertError('Erro ao salvar a pessoa!')
    }
    createAlertError(e?.response?.data?.message)
  }
}
</script>
<template>
  <ModalBackground @closeModal="peopleSwitch">
    <div class="modal-container">
      <h2 class="register-title">
        {{ formValues.id === null ? 'Cadastrar Nova ' : 'Atualizar ' }} Pessoa
      </h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-container">
          <span>Dados</span>
          <div class="form-input-wrapper">
            <InputDefault
              :needFocus="peopleModal"
              v-model="formValues.nome"
              type="text"
              label="Nome"
              name="nome"
              placeholder="Nome"
            />
            <InputDefault
              v-model="formValues.cpf"
              :errorMessage="formErrors?.cpf"
              type="text"
              label="CPF"
              name="cpf"
              mask="###.###.###-##"
              placeholder="000.000.000-00"
            />
          </div>
        </div>
        <div class="form-input-container">
          <span>Endereço</span>
          <div class="form-input-wrapper">
            <InputDefault
              v-model="formValues.endereco.cep"
              :error-message="formErrors.cep"
              type="text"
              label="CEP"
              name="cep"
              mask="#####-###"
              placeholder="00000-000"
            />
            <InputSelect
              :options="optionsCountries"
              v-model="formValues.endereco.paisOption"
              label="País"
              name="pais"
            />
            <InputDefault
              v-model="formValues.endereco.estado"
              type="text"
              label="Estado"
              name="estado"
              placeholder="Estado"
            />
            <InputDefault
              v-model="formValues.endereco.cidade"
              type="text"
              label="Cidade"
              name="cidade"
              placeholder="Cidade"
            />
            <InputDefault
              v-model="formValues.endereco.bairro"
              type="text"
              label="Bairro"
              name="bairro"
              placeholder="Bairro"
            />
            <InputDefault
              v-model="formValues.endereco.logradouro"
              type="text"
              label="Rua"
              name="logradouro"
              placeholder="Rua"
            />
            <InputDefault
              v-model="formValues.endereco.numero"
              type="number"
              label="Número"
              name="numero"
              placeholder="000"
            />
          </div>
        </div>
        <div class="form-input-container">
          <span>Foto</span>
          <div class="form-input-wrapper">
            <div class="form-image-wrapper">
              <label for="foto"
                ><span :class="formValues.foto?.src && 'not-visible'">Adicionar Foto</span
                ><img v-if="formValues.foto?.src" :src="formValues.foto?.src" alt="Foto Escolhida"
              /></label>
              <input
                type="file"
                @change="handleFile"
                accept="image/png, image/jpeg"
                name="foto"
                id="foto"
              />
            </div>
          </div>
        </div>
        <div class="form-button-wrapper">
          <button class="default-button" type="reset">
            {{ formValues.id === null ? 'Limpar' : 'Restaurar' }}
          </button>
          <button class="default-button" type="submit">
            {{ formValues.id === null ? 'Cadastrar' : 'Salvar' }}
          </button>
          <button class="close-button" type="button" @click="peopleSwitch">
            <span class="not-visible">close</span>X
          </button>
        </div>
      </form>
    </div>
  </ModalBackground>
</template>
