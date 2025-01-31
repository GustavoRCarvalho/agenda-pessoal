<script setup>
import UsersList from '@/components/users/UsersList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { useModalsStore } from '@/stores/modals'
import { ref } from 'vue'

const store = useModalsStore()
const { userSwitch } = store

const search = ref('')
</script>
<template>
  <div class="top-wrapper">
    <h1>Lista de Usuários</h1>
    <button class="default-button" @click="userSwitch">Adicionar</button>
  </div>
  <InputDefault
    v-model="search"
    type="text"
    label="Pesquisar"
    name="search"
    placeholder="Pesquisar"
  />
  <UsersList />
</template>
<style scoped></style>
