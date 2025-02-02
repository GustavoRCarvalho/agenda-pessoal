<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId, transformImage, verifyCEP } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import { peopleValidation } from '@/utils/validations'
import { debounce } from 'lodash'

const ModalsStore = useModalsStore()
const { peopleSwitch } = ModalsStore
const { peopleModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetPeopleRegisterEdit } = RegisterStore
const { peopleRegisterEdit } = storeToRefs(RegisterStore)

const formValues = reactive({ ...peopleRegisterEdit.value })
const formErrors = reactive({})

// Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => peopleRegisterEdit.value,
  (newVal) => {
    Object.assign(formValues, newVal)
    formValues.foto.data = {}
    formValues.foto.src = ''
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
  () => formValues.cep,
  debounce(async (cep) => {
    const newValues = await verifyCEP(cep)

    if (!newValues?.erro) {
      formValues.pais = 'BR'
      formValues.estado = newValues.estado
      formValues.cidade = newValues.localidade
      formValues.bairro = newValues.bairro
      formValues.logradouro = newValues.logradouro
      formErrors['cep'] = null
    } else {
      formErrors['cep'] = 'CEP não encontrado'
    }
  }, 300),
),
  function handleReset(e) {
    e.preventDefault()
    Object.assign(formValues, peopleRegisterEdit.value)
    formValues.foto.data = {}
    formValues.foto.src = ''
  }

function handleSubmit(e) {
  e.preventDefault()

  if (!peopleValidation({ values: formValues, errors: formErrors })) {
    return
  }

  if (!formValues.id) {
    formValues.id = generateUniqueId()
  }

  console.log(formValues)
}
async function handleFile(e) {
  const file = e.target.files[0]
  if (!file || !['image/png', 'image/jpeg'].includes(file.type)) {
    // event Error
    console.error('Imagens devem ser no formato .PNG ou .JPEG')
    return
  }
  formValues.foto.data = file

  try {
    formValues.foto.src = await transformImage(file)
  } catch (error) {
    // event Error
    console.error('Erro ao processar a imagem:', error)
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
              v-model="formValues.name"
              type="text"
              label="Nome"
              name="name"
              placeholder="Nome"
            />
            <InputDefault
              v-model="formValues.cpf"
              :errorMessage="formErrors.cpf"
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
              v-model="formValues.cep"
              :error-message="formErrors.cep"
              type="text"
              label="CEP"
              name="cep"
              mask="#####-###"
              placeholder="00000-000"
            />
            <InputDefault
              v-model="formValues.pais"
              type="text"
              label="País"
              name="pais"
              placeholder="País"
            />
            <InputDefault
              v-model="formValues.estado"
              type="text"
              label="Estado"
              name="estado"
              placeholder="Estado"
            />
            <InputDefault
              v-model="formValues.cidade"
              type="text"
              label="Cidade"
              name="cidade"
              placeholder="Cidade"
            />
            <InputDefault
              v-model="formValues.bairro"
              type="text"
              label="Bairro"
              name="bairro"
              placeholder="Bairro"
            />
            <InputDefault
              v-model="formValues.logradouro"
              type="text"
              label="Rua"
              name="logradouro"
              placeholder="Rua"
            />
            <InputDefault
              v-model="formValues.numero"
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
              <!-- @change="(e) => (formValues.foto = e.target.files[0])" -->
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
<style scoped></style>
<!-- {
  "cpf": "string",
  "endereco": {
    "bairro": "string",
    "cep": "string",
    "cidade": "string",
    "estado": "string",
    "id": 0,
    "logradouro": "string",
    "numero": 0,
    "pais": "string"
  },
  "foto": {
    "id": "string",
    "name": "string",
    "type": "string"
  },
  "id": 0,
  "nome": "string"
} -->
