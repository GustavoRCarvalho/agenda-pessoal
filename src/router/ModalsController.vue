<script setup>
import ContactRegister from '@/components/contacts/ContactRegister.vue'
import ChangePassword from '@/components/myRegister/ChangePassword.vue'
import PeopleRegister from '@/components/people/PeopleRegister.vue'
import UserRegister from '@/components/users/UserRegister.vue'
import { useModalsStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'

const store = useModalsStore()
const { peopleModal, contactModal, userModal, passModal } = storeToRefs(store)
</script>
<template>
  <PeopleRegister v-show="peopleModal" />
  <ContactRegister v-show="contactModal" />
  <UserRegister v-show="userModal" />
  <ChangePassword v-show="passModal" />
  <!-- usar v-show caso deseje manter o estado dos componentes da dom preenchidos no caso de abrir de novo -->
  <!-- usar v-if caso deseje destruir o estado... -->
</template>
