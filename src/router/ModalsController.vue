<script setup>
import ContactRegister from '@/components/contacts/ContactRegister.vue'
import PeopleRegister from '@/components/people/PeopleRegister.vue'
import { useModalsStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'

const store = useModalsStore()
const { peopleModal, contactModal } = storeToRefs(store)
</script>
<template>
  <PeopleRegister v-show="peopleModal" />
  <ContactRegister v-show="contactModal" />
  <!-- usar v-show caso deseje manter o estado dos componentes da dom preenchidos no caso de abrir de novo -->
  <!-- usar v-if caso deseje destruir o estado... -->
</template>
