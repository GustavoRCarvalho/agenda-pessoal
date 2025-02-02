<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import InputPhone from '../inputs/InputPhone.vue'

const ModalsStore = useModalsStore()
const { userSwitch } = ModalsStore
const { userModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetUserRegisterEdit } = RegisterStore
const { userRegisterEdit } = storeToRefs(RegisterStore)

const formFields = reactive({ ...userRegisterEdit.value })

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => userRegisterEdit.value,
  (newVal) => {
    Object.assign(formFields, newVal)
  },
)

//Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => userModal.value,
  (newVal) => {
    if (!newVal) {
      resetUserRegisterEdit()
    }
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formFields, userRegisterEdit.value)
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
</script>
<template>
  <ModalBackground @closeModal="userSwitch">
    <div class="modal-container">
      <h2 class="register-title">
        {{ formFields.id === null ? 'Cadastrar Novo ' : 'Atualizar ' }} Usuário
      </h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-container">
          <span>Dados</span>
          <div class="form-input-wrapper">
            <InputDefault
              :needFocus="userModal"
              v-model="formFields.nome"
              type="text"
              label="Nome"
              name="nome"
              placeholder="Nome"
            />
            <InputDefault
              v-model="formFields.username"
              type="text"
              label="Apelido"
              name="username"
              placeholder="Apelido"
            />
            <InputDefault
              v-model="formFields.cpf"
              type="text"
              label="CPF"
              name="cpf"
              mask="###.###.###-##"
              placeholder="000.000.000-00"
            />
            <InputDefault
              v-model="formFields.dataNascimento"
              type="text"
              label="Data de Nascimento"
              name="dataNascimento"
              mask="####.##.##"
              placeholder="1970.01.01"
            />
          </div>
        </div>
        <div class="form-input-container">
          <span>Contatos</span>
          <div class="form-input-wrapper">
            <InputDefault
              v-model="formFields.email"
              type="text"
              label="Email"
              name="email"
              placeholder="seuemail@dominio.com"
            />
            <InputPhone v-model="formFields.telefone" />
          </div>
        </div>
        <div class="form-button-wrapper">
          <button class="default-button" type="reset">
            {{ formFields.id === null ? 'Limpar' : 'Restaurar' }}
          </button>
          <button class="default-button" type="submit">
            {{ formFields.id === null ? 'Cadastrar' : 'Salvar' }}
          </button>
          <button class="close-button" type="button" @click="userSwitch">
            <span class="not-visible">close</span>X
          </button>
        </div>
      </form>
    </div>
  </ModalBackground>
</template>
<style scoped></style>
