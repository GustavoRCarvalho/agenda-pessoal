<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'
import IconEdit from '../icons/IconEdit.vue'
import { useAlertsStore } from '@/stores/alerts'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const ListsStore = useListsStore()
const { users } = storeToRefs(ListsStore)

const RegisterStore = useRegistersStore()
const { changeUserRegisterEdit, resetUserRegisterEdit } = RegisterStore

const ModalsStore = useModalsStore()
const { userSwitch } = ModalsStore

async function handleClickEdit(id) {
  resetUserRegisterEdit()
  try {
    await changeUserRegisterEdit(id)
    createAlertSucess('Pessoa encontrada com sucesso.')
    userSwitch()
  } catch (e) {
    createAlertError(e?.message)
  }
}
</script>
<template>
  <table class="list-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Apelido</th>
        <th>Ferramentas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.nome }}</td>
        <td>{{ user.username }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleClickEdit(user.id)">
            <span class="not-visible">Editar {{ user.username }}</span
            ><IconEdit />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
