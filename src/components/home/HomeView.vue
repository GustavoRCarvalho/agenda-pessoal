<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import InputDefault from '../inputs/InputDefault.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import HomeList from './HomeList.vue'
import { watch } from 'vue'

const store = useModalsStore()
const { contactSwitch } = store

const ListsStore = useListsStore()
const { setContacts, setFavs, setPhoto } = ListsStore
const { contacts, favs } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (contacts.value?.length === 0) setContacts()
  if (favs.value?.length === 0) setFavs()
})

watch(contacts, (value) => {
  value.forEach(({ pessoa }) => {
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
