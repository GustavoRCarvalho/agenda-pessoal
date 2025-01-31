<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'

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

const userList = [
  {
    id: 1,
    username: 'username',
    nome: 'Lorem Ipsum',
  },
  {
    id: 2,
    username: 'username',
    nome: 'Ipsum Lorem',
  },
  {
    id: 3,
    username: 'username',
    nome: 'Lorem Lorem',
  },
]
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
      <tr v-for="user in userList" :key="user.id">
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
