<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'

const RegisterStore = useRegistersStore()
const { changeContactRegisterEdit, resetContactRegisterEdit } = RegisterStore

const ListsStore = useListsStore()
const { contacts } = storeToRefs(ListsStore)

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore

function handleClickEdit(contact) {
  resetContactRegisterEdit()
  changeContactRegisterEdit(contact)
  contactSwitch()
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
        <th>Tipo</th>
        <th>Ferramentas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>
          <span>{{ contact.private ? 'Privado' : 'Público' }}</span
          >{{ contact.name }}
        </td>
        <td>{{ contact.tipoContato }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleClickEdit(contact)">
            <span class="not-visible">Editar {{ contact.name }}</span
            >E</button
          ><button class="tool-button delete-button" @click="handleDelete(contact.id)">
            <span class="not-visible">Deletar {{ contact.name }}</span
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
