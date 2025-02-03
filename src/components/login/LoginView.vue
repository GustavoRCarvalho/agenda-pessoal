<script setup>
import InputDefault from '@/components/inputs/InputDefault.vue'
import { reactive } from 'vue'
import InputCheck from '../inputs/InputCheck.vue'
import { passValidation } from '@/utils/validations'
import { useAuthStore } from '@/stores/auth'
import { useAlertsStore } from '@/stores/alerts'
import router from '@/router'

const AuthStore = useAuthStore()
const { login } = AuthStore

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const formValues = reactive({})
const formErrors = reactive({})

async function handleSubmit(e) {
  e.preventDefault()

  if (!passValidation({ values: formValues, errors: formErrors })) {
    return
  }

  console.log(formValues)
  login(formValues)
    .then(() => {
      createAlertSucess('Autenticado com sucesso')
      router.push({ name: 'home' })
    })
    .catch((e) => {
      createAlertError(e)
    })
}
</script>
<template>
  <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
    <h1>Bem vindo a Agenda Pessoal</h1>
    <InputDefault
      v-model="formValues.username"
      type="text"
      label="Usuário"
      name="username"
    /><InputDefault
      v-model="formValues.password"
      :error-message="formErrors.password"
      type="current-password"
      label="Senha"
      name="password"
    />
    <InputCheck v-model="formValues.remember" name="remember" label="Mantenha-me conectado" />
    <button class="default-button" type="submit">Entrar</button>
  </form>
</template>
<style scoped>
h1 {
  font-weight: 400;
  font-size: 1.5em;
}
form {
  gap: 0;
  height: calc(100vh - 6.25em);

  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    height: calc(100vh - 2.75em);
  }
}
.default-input-label {
  background-color: transparent;
}
button {
  margin-block: 0.6em;
  width: calc(100% - 0.5em - 2px);
  max-width: 17.57em;
  @media (max-width: 720px) {
    max-width: unset;
  }
}
.checkbox-container {
  border: none;
  flex-direction: row-reverse;
  justify-content: start;
}
</style>
