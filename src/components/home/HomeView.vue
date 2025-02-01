<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import InputDefault from '../inputs/InputDefault.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import HomeList from './HomeList.vue'

const store = useModalsStore()
const { contactSwitch } = store

const ListsStore = useListsStore()
const { setContacts, setPhoto } = ListsStore
const { contacts, photos } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (contacts.value?.length === 0) setContacts()

  contacts.value.forEach(({ pessoa }) => {
    if (photos[pessoa?.foto?.id]) return
    setPhoto(pessoa?.foto?.id)
  })
})
</script>
<template>
  <div class="top-wrapper">
    <h1>Home</h1>
    <button class="default-button" title="Adicionar Novo Contato" @click="contactSwitch">
      Adicionar
    </button>
  </div>
  <div class="top-wrapper">
    <InputDefault
      v-model="search"
      type="text"
      label="Pesquisar"
      name="search"
      placeholder="Pesquisar"
    />
    <button
      type="button"
      class="reload-button"
      title="Recarregar Lista de Contatos"
      @click="setContacts"
    >
      <span class="not-visible">Recarregar lista de Contatos</span>
      R
    </button>
  </div>
  <HomeList />
</template>
<style scoped></style>
