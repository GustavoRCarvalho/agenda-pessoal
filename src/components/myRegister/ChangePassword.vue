<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import { passValidation } from '@/utils/validations'

const ModalsStore = useModalsStore()
const { passSwitch } = ModalsStore
const { passModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetPassRegisterEdit } = RegisterStore
const { passRegisterEdit } = storeToRefs(RegisterStore)

const formValues = reactive({ ...passRegisterEdit.value })
const formErrors = reactive({})

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => passRegisterEdit.value,
  (newVal) => {
    Object.assign(formValues, newVal)
  },
)

//Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => passModal.value,
  (newVal) => {
    if (!newVal) {
      resetPassRegisterEdit()
    }
  },
)

watch(
  () => formValues.newPassword,
  (newPassword) => {
    if (newPassword && formErrors['newPasswordConfirmation']) {
      formErrors['newPasswordConfirmation'] = null
    }
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formValues, passRegisterEdit.value)
}

function handleSubmit(e) {
  e.preventDefault()

  if (!passValidation({ values: formValues, errors: formErrors })) {
    return
  }
  if (!formValues.id) {
    formValues.id = generateUniqueId()
  }

  console.log(formValues)
}
</script>
<template>
  <ModalBackground @closeModal="passSwitch">
    <div class="modal-container">
      <h2 class="register-title">Alterar Senha</h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-wrapper">
          <InputDefault
            :needFocus="passModal"
            v-model="formValues.password"
            :errorMessage="formErrors.password"
            type="password"
            label="Senha Atual"
            name="username"
            placeholder="Senha"
          />
          <InputDefault
            v-model="formValues.newPassword"
            :errorMessage="formErrors.newPassword"
            type="password"
            label="Nova Senha"
            name="new-password"
            placeholder="Nova Senha"
          />
          <InputDefault
            v-model="formValues.newPasswordConfirmation"
            :errorMessage="formErrors.newPasswordConfirmation"
            type="password"
            label="Confirme a Nova Senha"
            name="new-password"
            placeholder="Nova Senha"
          />
        </div>
        <div class="form-button-wrapper">
          <button class="default-button" type="reset">Limpar</button>
          <button class="default-button" type="submit">Enviar</button>
          <button class="close-button" type="button" @click="passSwitch">
            <span class="not-visible">close</span>X
          </button>
        </div>
      </form>
    </div>
  </ModalBackground>
</template>
<style scoped>
.form-input-wrapper {
  flex-direction: column;
  align-items: center;
}
</style>
