<script setup>
import { byteArray } from '@/assets/byteArray'
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'
import IconEdit from '../icons/IconEdit.vue'
import IconTrash from '../icons/IconTrash.vue'
import { useAlertsStore } from '@/stores/alerts'
import peopleService from '@/api/people'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const ListsStore = useListsStore()
const { setPeople } = ListsStore
const { people, photos } = storeToRefs(ListsStore)

const RegisterStore = useRegistersStore()
const { changePeopleRegisterEdit, resetPeopleRegisterEdit } = RegisterStore

const ModalsStore = useModalsStore()
const { peopleSwitch } = ModalsStore

async function handleClickEdit(id) {
  resetPeopleRegisterEdit()
  try {
    await changePeopleRegisterEdit(id)
    createAlertSucess('Pessoa encontrada com sucesso.')
    peopleSwitch()
  } catch (e) {
    createAlertError(e?.message)
  }
}

async function handleDelete(id) {
  if (id) {
    try {
      await peopleService.deletePeople(id)
      createAlertSucess('Sucesso ao excluir o contato.')
      setPeople()
    } catch (e) {
      if (e.status === 404 || e?.response?.data?.message) {
        createAlertError('Erro ao salvar o usuário!')
      }
      createAlertError(e?.response?.data?.message)
    }
  }
}
</script>
<template>
  <table class="list-table">
    <thead>
      <tr>
        <th></th>
        <th>Nome</th>
        <th>Ferramentas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pessoa in people" :key="pessoa.id">
        <td>
          <img
            :alt="'Foto da ' + pessoa.nome"
            class="logo"
            :src="photos[pessoa?.id] ? photos[pessoa?.id] : 'data:image/png;base64,' + byteArray"
          />
        </td>
        <td>{{ pessoa.nome }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleClickEdit(pessoa.id)">
            <span class="not-visible">Editar {{ pessoa.nome }}</span
            ><IconEdit /></button
          ><button class="tool-button delete-button" @click="handleDelete(pessoa.id)">
            <span class="not-visible">Deletar {{ pessoa.nome }}</span
            ><IconTrash />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <span class="not-found" v-if="!people.length">Nenhuma pessoa encontrada</span>
</template>
