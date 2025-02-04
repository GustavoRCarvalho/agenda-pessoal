<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import ContactsList from '@/components/contacts/ContactsList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import IconReload from '../icons/IconReload.vue'
import { useAlertsStore } from '@/stores/alerts'
import { watch } from 'vue'
import { debounce } from 'lodash'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const store = useModalsStore()
const { contactSwitch } = store

const ListsStore = useListsStore()
const { setContacts } = ListsStore
const { contacts } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (contacts.value?.length === 0) setContacts()
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
    search.value = ''
    createAlertSucess('Lista de contatos recarregada com sucesso.')
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
    <h1>Lista de Contatos</h1>
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
  <ContactsList />
</template>
<style scoped></style>
