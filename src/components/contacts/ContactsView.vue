<script setup>
import ContactsList from '@/components/contacts/ContactsList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { useModalsStore } from '@/stores/modals'
import { ref } from 'vue'

const store = useModalsStore()
const { contactSwitch } = store

const search = ref('')
</script>
<template>
  <div class="top-wrapper">
    <h1>Lista de Contatos</h1>
    <button class="default-button" @click="contactSwitch">Adicionar</button>
  </div>
  <InputDefault
    v-model="search"
    type="text"
    label="Pesquisar"
    name="search"
    placeholder="Pesquisar"
  />
  <ContactsList />
</template>
<style scoped></style>
