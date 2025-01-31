<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId, transformImage } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'

const ModalsStore = useModalsStore()
const { peopleSwitch } = ModalsStore
const { peopleModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetPeopleRegisterEdit } = RegisterStore
const { peopleRegisterEdit } = storeToRefs(RegisterStore)

const formFields = reactive({ ...peopleRegisterEdit.value })

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => peopleRegisterEdit.value,
  (newVal) => {
    Object.assign(formFields, newVal)
    formFields.foto.data = {}
    formFields.foto.src = ''
  },
)

//Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => peopleModal.value,
  (newVal) => {
    if (!newVal) {
      resetPeopleRegisterEdit()
    }
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formFields, peopleRegisterEdit.value)
  formFields.foto.data = {}
  formFields.foto.src = ''
}

function handleSubmit(e) {
  e.preventDefault()

  const form = new FormData(e.target)
  const formValues = Object.fromEntries(form)
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
  formFields.foto.data = file

  try {
    formFields.foto.src = await transformImage(file)
  } catch (error) {
    // event Error
    console.error('Erro ao processar a imagem:', error)
  }
}
</script>
<template>
  <ModalBackground @closeModal="peopleSwitch">
    <div class="modal-container">
      <h2 class="register-title">Registro de Pessoa</h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-container">
          <span>Dados</span>
          <div class="form-input-wrapper">
            <InputDefault
              :needFocus="peopleModal"
              v-model="formFields.name"
              type="text"
              label="Nome"
              name="name"
              placeholder="Nome"
            />
            <InputDefault
              v-model="formFields.cpf"
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
              v-model="formFields.cep"
              type="text"
              label="CEP"
              name="cep"
              mask="#####-###"
              placeholder="00000-000"
            />
            <InputDefault
              v-model="formFields.pais"
              type="text"
              label="País"
              name="pais"
              placeholder="País"
            />
            <InputDefault
              v-model="formFields.estado"
              type="text"
              label="Estado"
              name="estado"
              placeholder="Estado"
            />
            <InputDefault
              v-model="formFields.cidade"
              type="text"
              label="Cidade"
              name="cidade"
              placeholder="Cidade"
            />
            <InputDefault
              v-model="formFields.bairro"
              type="text"
              label="Bairro"
              name="bairro"
              placeholder="Bairro"
            />
            <InputDefault
              v-model="formFields.logradouro"
              type="text"
              label="Rua"
              name="logradouro"
              placeholder="Rua"
            />
            <InputDefault
              v-model="formFields.numero"
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
                ><span :class="formFields.foto?.src && 'not-visible'">Adicionar Foto</span
                ><img v-if="formFields.foto?.src" :src="formFields.foto?.src" alt="Foto Escolhida"
              /></label>
              <!-- @change="(e) => (formFields.foto = e.target.files[0])" -->
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
          <button class="default-button" type="reset">Restaurar</button>
          <button class="default-button" type="submit">Enviar</button>
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
