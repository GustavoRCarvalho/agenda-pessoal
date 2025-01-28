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

const peopleList = [{ id: '123456', name: 'Lorem Ipsum', src: '@/assets/logo.svg' }]
</script>
<template>
  <table>
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
          <img alt="Foto da Pessoa" class="logo" src="@/assets/logo.svg" width="50" height="50" />
        </td>
        <td>{{ people.name }}</td>
        <td><button @click="handleClickEdit(people.id)">Edit</button><button>Del</button></td>
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
