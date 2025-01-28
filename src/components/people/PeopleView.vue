<script setup>
import PeopleList from '@/components/people/PeopleList.vue'
import InputDefault from '../InputDefault.vue'
import { useModalsStore } from '@/stores/modals'
import { ref } from 'vue'

const store = useModalsStore()
const { peopleSwitch } = store

const search = ref('')
</script>
<template>
  <div class="top-wrapper">
    Pessoas
    <button @click="peopleSwitch">adicionar</button>
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
