<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import InputDefault from '../inputs/InputDefault.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import HomeList from './HomeList.vue'
import { watch } from 'vue'
import IconReload from '../icons/IconReload.vue'
import { useAlertsStore } from '@/stores/alerts'
import { debounce } from 'lodash'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const store = useModalsStore()
const { contactSwitch } = store

const ListsStore = useListsStore()
const { setContacts, setFavs, setPhoto } = ListsStore
const { contacts, favs } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (contacts.value?.length === 0) setContacts()
  if (Object.keys(favs.value)?.length === 0) setFavs()
})

watch(contacts, (value) => {
  value.forEach(({ pessoa }) => {
    setPhoto(pessoa?.foto?.id)
  })
})

watch(
  search,
  debounce(async (searchValue) => {
    await setContacts(searchValue)
  }, 500),
)

async function handleReload() {
  try {
    await setContacts()
    await setFavs()
    search.value = ''
    createAlertSucess('Lista de contatos e favoritos recarregada com sucesso.')
  } catch (e) {
    if (e.status === 404 || e?.response?.data?.message) {
      createAlertError('Erro ao recarregar lista!')
    }
    createAlertError(e?.response?.data?.message)
  }
}
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
      @click="handleReload"
    >
      <span class="not-visible">Recarregar lista de Contatos</span>
      <IconReload />
    </button>
  </div>
  <HomeList />
</template>
