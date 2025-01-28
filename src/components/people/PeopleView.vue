<script setup>
import PeopleList from '@/components/people/PeopleList.vue'
import { useModalsStore } from '@/stores/modals'

const store = useModalsStore()
const { peopleSwitch } = store
</script>
<template>
  <div class="top-wrapper">
    Pessoas
    <button @click="peopleSwitch">adicionar</button>
  </div>
  <input type="text" />
  <PeopleList />
</template>
<style scoped></style>
