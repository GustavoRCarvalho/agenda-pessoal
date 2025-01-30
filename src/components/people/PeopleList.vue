<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'

const RegisterStore = useRegistersStore()
const { changePeopleRegisterEdit, resetPeopleRegisterEdit } = RegisterStore

const ModalsStore = useModalsStore()
const { peopleSwitch } = ModalsStore

function handleClickEdit(id) {
  resetPeopleRegisterEdit()
  changePeopleRegisterEdit(id)
  peopleSwitch()
}

function handleDelete(id) {
  if (id) {
    console.log(id)
  }
}

const peopleList = [{ id: 123456, name: 'Lorem Ipsum', src: '@/assets/logo.svg' }]
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
      <tr v-for="people in peopleList" :key="people.id">
        <td>
          <img :alt="'Foto da ' + people.name" class="logo" src="@/assets/logo.svg" />
        </td>
        <td>{{ people.name }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleClickEdit(people.id)">
            <span class="not-visible">Editar {{ people.name }}</span
            >E</button
          ><button class="tool-button delete-button" @click="handleDelete(people.id)">
            <span class="not-visible">Deletar {{ people.name }}</span
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
    "endereco": {
      "bairro": "string",
      "cep": "string",
      "cidade": "string",
      "estado": "string",
      "id": 0,
      "logradouro": "string",
      "numero": 0,
      "pais": "string"
    },
    "foto": {
      "id": "string",
      "name": "string",
      "type": "string"
    },
    "id": 0,
    "nome": "string"
  }
] -->
