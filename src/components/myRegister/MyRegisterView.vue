<script setup>
import { useModalsStore } from '@/stores/modals'
import { useUserStore } from '@/stores/user'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import InputDefault from '../inputs/InputDefault.vue'
import InputPhone from '../inputs/InputPhone.vue'
import InputDate from '../inputs/InputDate.vue'

const ModalsStore = useModalsStore()
const { passSwitch } = ModalsStore

const UserStore = useUserStore()
const { user } = storeToRefs(UserStore)

const formFields = reactive({ ...user.value })

//Atualiza os campos reativos do formulário caso acha alteração no usuário
watch(
  () => user.value,
  (newVal) => {
    Object.assign(formFields, newVal)
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formFields, user.value)
}

function handleSubmit(e) {
  e.preventDefault()

  console.log(formFields)
}
</script>
<template>
  <h2 class="register-title">Meu Cadastro</h2>
  <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
    <div class="form-input-container">
      <span>Dados</span>
      <div class="form-input-wrapper">
        <InputDefault
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
        <InputDate v-model="formFields.dataNascimento" />
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
