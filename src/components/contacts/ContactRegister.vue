<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import InputCheck from '../inputs/InputCheck.vue'
import InputSelect from '../inputs/InputSelect.vue'
import InputPhone from '../inputs/InputPhone.vue'

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore
const { contactModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetContactRegisterEdit } = RegisterStore
const { contactRegisterEdit } = storeToRefs(RegisterStore)

const formFields = reactive({ ...contactRegisterEdit.value })

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => contactRegisterEdit.value,
  (newVal) => {
    Object.assign(formFields, newVal)
  },
)

//Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => contactModal.value,
  (newVal) => {
    if (!newVal) {
      resetContactRegisterEdit()
    }
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formFields, contactRegisterEdit.value)
}

function handleSubmit(e) {
  e.preventDefault()

  if (!formFields.id) {
    formFields.id = generateUniqueId()
  }

  console.log(formFields)
  // console.log(formValues)
}
</script>
<template>
  <ModalBackground @closeModal="contactSwitch">
    <div class="modal-container">
      <h2 class="register-title">Registro de Contato</h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-container">
          <span>Pessoa</span>
          <div class="form-input-wrapper">
            <InputSelect
              :options="[
                { key: 0, label: 'Lorem Ipsum' },
                { key: 1, label: 'Ipsum Lorem' },
                { key: 2, label: 'Lorem Lorem' },
              ]"
              v-model="formFields.pessoa"
              label="Selecione uma Pessoa"
              name="pessoa"
            />
          </div>
        </div>
        <div class="form-input-container">
          <span>Dados</span>
          <div class="form-input-wrapper">
            <InputSelect
              :options="[
                { key: 'CELULAR', label: 'CELULAR' },
                { key: 'EMAIL', label: 'EMAIL' },
                { key: 'TELEFONE', label: 'TELEFONE' },
              ]"
              v-model="formFields.tipoContato"
              label="Tipo de Contato"
              name="type"
            />
            <InputDefault
              v-if="formFields.tipoContato?.key === 'EMAIL'"
              v-model="formFields.email"
              type="text"
              label="Email"
              name="email"
              placeholder="seuemail@dominio.com"
            />
            <InputPhone
              v-if="['CELULAR', 'TELEFONE'].includes(formFields.tipoContato?.key)"
              v-model="formFields.telefone"
            />
          </div>
        </div>
        <div class="form-input-container">
          <span>Outros</span>
          <div class="form-input-wrapper">
            <InputDefault v-model="formFields.tag" type="text" label="Descrição" name="tag" />
            <InputCheck v-model="formFields.private" type="text" label="Privado" name="private" />
          </div>
        </div>
        <div class="form-button-wrapper">
          <button class="default-button" type="reset">Limpar</button>
          <button class="default-button" type="submit">Enviar</button>
          <button class="close-button" type="button" @click="contactSwitch">
            <span class="not-visible">close</span>X
          </button>
        </div>
      </form>
    </div>
  </ModalBackground>
</template>
<style scoped></style>
<!-- 
  {
    "email": "string",
    "id": 0,
    "pessoa": {
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
    },
    "privado": true,
    "tag": "string",
    "telefone": "string",
    "tipoContato": "CELULAR",
    "usuario": {
      "cpf": "string",
      "dataNascimento": "2025-01-28",
      "email": "string",
      "id": 0,
      "nome": "string",
      "password": "string",
      "telefone": "string",
      "username": "string"
    }
  } -->
