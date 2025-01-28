<script setup>
import PeopleRegister from '@/components/people/PeopleRegister.vue'
import { useModalsStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'

const store = useModalsStore()
const { peopleModal } = storeToRefs(store)
</script>
<template>
  <PeopleRegister v-show="peopleModal" />
  <!-- usar v-show caso deseje manter o estado dos componentes da dom preenchidos no caso de abrir de novo -->
</template>
