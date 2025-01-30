<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'

const RegisterStore = useRegistersStore()
const { changeContactRegisterEdit, resetContactRegisterEdit } = RegisterStore

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore

function handleClickEdit(id) {
  resetContactRegisterEdit()
  changeContactRegisterEdit(id)
  contactSwitch()
}

function handleDelete(id) {
  if (id) {
    console.log(id)
  }
}

const peopleList = [
  {
    id: 1,
    name: 'Lorem Ipsum',
    private: true,
    tipoContato: 'TELEFONE',
    src: '@/assets/logo.svg',
  },
  {
    id: 2,
    name: 'Ipsum Lorem',
    private: false,
    tipoContato: 'EMAIL',
    src: '@/assets/logo.svg',
  },
  {
    id: 3,
    name: 'Lorem Lorem',
    private: false,
    tipoContato: 'CELULAR',
    src: '@/assets/logo.svg',
  },
]
</script>
<template>
  <table class="list-table">
    <thead>
      <tr>
        <th></th>
        <th>Nome</th>
        <th>Tipo</th>
        <th>Ferramentas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="people in peopleList" :key="people.id">
        <td>
          <img :alt="'Foto da ' + people.name" class="logo" src="@/assets/logo.svg" />
        </td>
        <td>
          <span>{{ people.private ? 'Privado' : 'Público' }}</span
          >{{ people.name }}
        </td>
        <td>{{ people.tipoContato }}</td>
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
    "email": "string",
    "id": 0,
    "pessoa": {
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
    },
    "privado": true,
    "tag": "string",
    "telefone": "string",
    "tipoContato": "CELULAR",
    "usuario": {
      "cpf": "string",
      "dataNascimento": "2025-01-28",
      "email": "string",
      "id": 0,
      "nome": "string",
      "password": "string",
      "telefone": "string",
      "username": "string"
    }
  }
] -->
