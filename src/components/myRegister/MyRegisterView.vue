<script setup>
import { useModalsStore } from '@/stores/modals'
import { useUserStore } from '@/stores/user'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import InputDefault from '../inputs/InputDefault.vue'
import InputPhone from '../inputs/InputPhone.vue'
import InputDate from '../inputs/InputDate.vue'
import { userValidation } from '@/utils/validations'

const ModalsStore = useModalsStore()
const { passSwitch } = ModalsStore

const UserStore = useUserStore()
const { user } = storeToRefs(UserStore)

const formValues = reactive({ ...user.value })
const formErrors = reactive({})

//Atualiza os campos reativos do formulário caso acha alteração no usuário
watch(
  () => user.value,
  (newVal) => {
    Object.assign(formValues, newVal)
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formValues, user.value)
}

function handleSubmit(e) {
  e.preventDefault()

  if (!userValidation({ values: formValues, errors: formErrors })) {
    return
  }

  console.log(formValues)
}
</script>
<template>
  <h2 class="register-title">Meu Cadastro</h2>
  <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
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
          v-model="formValues.username"
          type="text"
          label="Apelido"
          name="username"
          placeholder="Apelido"
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
          :errorMessage="formErrors.cpf"
          type="text"
          label="Email"
          name="email"
          placeholder="seuemail@dominio.com"
        />
        <InputPhone v-model="formValues.telefone" />
      </div>
    </div>
    <div class="form-button-wrapper">
      <button class="default-button" type="reset">Restaurar</button>
      <button class="default-button" type="submit">Salvar</button>
    </div>
  </form>
  <button class="default-button change-pass" type="button" @click="passSwitch">
    Alterar Senha
  </button>
</template>
<style scoped>
.change-pass {
  margin-inline: calc(1em + 2px);
}
</style>
