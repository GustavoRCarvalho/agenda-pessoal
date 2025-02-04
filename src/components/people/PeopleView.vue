<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import PeopleList from '@/components/people/PeopleList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { watch } from 'vue'
import IconReload from '../icons/IconReload.vue'
import { useAlertsStore } from '@/stores/alerts'
import { debounce } from 'lodash'
import { onUnmounted } from 'vue'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const store = useModalsStore()
const { peopleSwitch } = store

const ListsStore = useListsStore()
const { setPeople, setPhoto } = ListsStore
const { people } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (people.value?.length === 0) setPeople()
})

onUnmounted(() => {
  if (search.value) {
    setPeople()
  }
})

watch(people, (value) => {
  value.forEach((pessoa) => {
    setPhoto(pessoa?.id)
  })
})

watch(
  search,
  debounce(async (searchValue) => {
    await setPeople(searchValue)
  }, 500),
)

async function handleReload() {
  try {
    await setPeople()
    search.value = ''
    createAlertSucess('Lista de pessoas recarregada com sucesso.')
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
    <h1>Lista de Pessoas</h1>
    <button class="default-button" title="Adicionar Nova Pessoa" @click="peopleSwitch">
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
      @click="handleReload"
      title="Recarregar Lista de Pessoas"
    >
      <span class="not-visible">Recarregar lista de Pessoas</span>
      <IconReload />
    </button>
  </div>
  <PeopleList />
</template>
