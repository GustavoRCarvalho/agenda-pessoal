<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import InputPhone from '../inputs/InputPhone.vue'
import { userValidation } from '@/utils/validations'
import InputDate from '../inputs/InputDate.vue'
import InputSelect from '../inputs/InputSelect.vue'
import { optionsTiposUser } from '@/utils/constants'
import userService from '@/api/users'
import { useAlertsStore } from '@/stores/alerts'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const ModalsStore = useModalsStore()
const { userSwitch } = ModalsStore
const { userModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetUserRegisterEdit } = RegisterStore
const { userRegisterEdit } = storeToRefs(RegisterStore)

const formValues = reactive({ ...userRegisterEdit.value })
const formErrors = reactive({})

// Limpa o erro caso quando o campo é alterado
// OBS: preferencialmente deve haver um watch para cada campo com verificação customizada
watch(formValues, () => {
  if (formErrors.cpf) {
    formErrors.cpf = null
  }
})
watch(
  () => formValues.password,
  () => {
    if (formErrors.password) {
      formErrors.password = null
    }
    // Limpa o erro de passwordConfirmation quando a senha original muda
    if (formErrors.passwordConfirmation) {
      formErrors.passwordConfirmation = null
    }
  },
)
watch(
  () => formValues.passwordConfirmation,
  () => {
    if (formErrors.passwordConfirmation) {
      formErrors.passwordConfirmation = null
    }
  },
)
watch(
  () => formValues.email,
  () => {
    if (formErrors.email) {
      formErrors.email = null
    }
  },
)

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => userRegisterEdit.value,
  (newVal) => {
    Object.assign(formValues, newVal)
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
  Object.assign(formValues, userRegisterEdit.value)
}

async function handleSubmit(e) {
  e.preventDefault()

  if (!userValidation({ values: formValues, errors: formErrors })) {
    return
  }
  if (!formValues.id) {
    formValues.id = generateUniqueId()
  }

  try {
    await userService.postUser(formValues)
    createAlertSucess('Sucesso ao salvar o usuário.')
    userSwitch()
  } catch (e) {
    console.error(e)
    createAlertError('Erro ao salvar o usuário!')
  }
}
</script>
<template>
  <ModalBackground @closeModal="userSwitch">
    <div class="modal-container">
      <h2 class="register-title">
        {{ formValues.id === null ? 'Cadastrar Novo ' : 'Atualizar ' }} Usuário
      </h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-container">
          <span>Conta</span>
          <div class="form-input-wrapper">
            <InputDefault
              :needFocus="userModal"
              v-model="formValues.username"
              type="text"
              label="Apelido"
              name="username"
              placeholder="Apelido"
            />
            <InputDefault
              v-if="!formValues.id"
              v-model="formValues.password"
              :errorMessage="formErrors.password"
              type="password"
              label="Senha"
              name="new-password"
              placeholder="Senha"
            />
            <InputDefault
              v-if="!formValues.id"
              v-model="formValues.passwordConfirmation"
              :errorMessage="formErrors.passwordConfirmation"
              type="password"
              label="Confirme a Senha"
              name="new-password"
              placeholder="Confirme a Senha"
            />
            <InputSelect
              :options="optionsTiposUser"
              v-model="formValues.tipoOption"
              label="Selecione o Tipo"
              name="tipoOption"
            />
          </div>
        </div>

        <div class="form-input-container">
          <span>Dados</span>
          <div class="form-input-wrapper">
            <InputDefault
              v-model="formValues.nome"
              type="text"
              label="Nome"
              name="nome"
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
            <InputDate v-model="formValues.dataNascimento" />
          </div>
        </div>
        <div class="form-input-container">
          <span>Contatos</span>
          <div class="form-input-wrapper">
            <InputDefault
              v-model="formValues.email"
              :errorMessage="formErrors.email"
              type="text"
              label="Email"
              name="email"
              placeholder="seuemail@dominio.com"
            />
            <InputPhone v-model="formValues.telefone" />
          </div>
        </div>
        <div class="form-button-wrapper">
          <button class="default-button" type="reset">
            {{ formValues.id === null ? 'Limpar' : 'Restaurar' }}
          </button>
          <button class="default-button" type="submit">
            {{ formValues.id === null ? 'Cadastrar' : 'Salvar' }}
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
