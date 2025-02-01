<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import PeopleList from '@/components/people/PeopleList.vue'
import InputDefault from '../inputs/InputDefault.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { watch } from 'vue'

const store = useModalsStore()
const { peopleSwitch } = store

const ListsStore = useListsStore()
const { setPeople, setPhoto } = ListsStore
const { people } = storeToRefs(ListsStore)

const search = ref('')

onMounted(() => {
  if (people.value?.length === 0) setPeople()
})

watch(people, (value) => {
  value.forEach((pessoa) => {
    setPhoto(pessoa?.foto?.id)
  })
})
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
      @click="setPeople"
      title="Recarregar Lista de Pessoas"
    >
      <span class="not-visible">Recarregar lista de Pessoas</span>
      R
    </button>
  </div>
  <PeopleList />
</template>
<style scoped></style>
