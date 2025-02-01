<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'

const ListsStore = useListsStore()
const { users } = storeToRefs(ListsStore)

const RegisterStore = useRegistersStore()
const { changeUserRegisterEdit, resetUserRegisterEdit } = RegisterStore

const ModalsStore = useModalsStore()
const { userSwitch } = ModalsStore

function handleClickEdit(id) {
  resetUserRegisterEdit()
  changeUserRegisterEdit(id)
  userSwitch()
}

function handleDelete(id) {
  if (id) {
    console.log(id)
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
            >E</button
          ><button class="tool-button delete-button" @click="handleDelete(user.id)">
            <span class="not-visible">Deletar {{ user.username }}</span
            >D
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<!-- [
  {
    "cpf": "string",
    "dataNascimento": "2025-01-28",
    "email": "string",
    "id": 0,
    "nome": "string",
    "password": "string",
    "telefone": "string",
    "username": "string"
  }
] -->
