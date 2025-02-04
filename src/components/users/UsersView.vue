<script setup>
import UsersList from '@/components/users/UsersList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { useModalsStore } from '@/stores/modals'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useListsStore } from '@/stores/lists'
import IconReload from '../icons/IconReload.vue'
import { useAlertsStore } from '@/stores/alerts'
import { watch } from 'vue'
import { debounce } from 'lodash'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const store = useModalsStore()
const { userSwitch } = store

const ListsStore = useListsStore()
const { setUsers } = ListsStore
const { users } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (users.value?.length === 0) setUsers()
})

watch(
  search,
  debounce(async (searchValue) => {
    await setUsers(searchValue)
  }, 500),
)

async function handleReload() {
  try {
    await setUsers()
    createAlertSucess('Lista de usuários recarregada com sucesso.')
    search.value = ''
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
    <h1>Lista de Usuários</h1>
    <button class="default-button" @click="userSwitch">Adicionar</button>
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
      @click="handleReload"
      title="Recarregar Lista de Usuários"
    >
      <span class="not-visible">Recarregar lista de Usuários</span>
      <IconReload />
    </button>
  </div>
  <UsersList />
</template>
<style scoped></style>
