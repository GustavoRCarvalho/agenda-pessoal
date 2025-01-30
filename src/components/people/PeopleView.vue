<script setup>
import PeopleList from '@/components/people/PeopleList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { useModalsStore } from '@/stores/modals'
import { ref } from 'vue'

const store = useModalsStore()
const { peopleSwitch } = store

const search = ref('')
</script>
<template>
  <div class="top-wrapper">
    <h1>Lista de Pessoas</h1>
    <button class="default-button" @click="peopleSwitch">Adicionar</button>
  </div>
  <InputDefault
    v-model="search"
    type="text"
    label="Pesquisar"
    name="search"
    placeholder="Pesquisar"
  />
  <PeopleList />
</template>
<style scoped></style>
