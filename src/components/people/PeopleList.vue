<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'

const ListsStore = useListsStore()
const { people, photos } = storeToRefs(ListsStore)

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
            :src="
              'data:image/png;base64,' +
              (photos[pessoa?.foto?.id]?.byteArray
                ? photos[pessoa?.foto?.id]?.byteArray
                : byteArray)
            "
          />
        </td>
        <td>{{ pessoa.nome }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleClickEdit(pessoa.id)">
            <span class="not-visible">Editar {{ pessoa.nome }}</span
            >E</button
          ><button class="tool-button delete-button" @click="handleDelete(pessoa.id)">
            <span class="not-visible">Deletar {{ pessoa.nome }}</span
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
