<script setup>
import { byteArray } from '@/assets/byteArray'
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'

const RegisterStore = useRegistersStore()
const { changeContactRegisterEdit, resetContactRegisterEdit } = RegisterStore

const ListsStore = useListsStore()
const { contacts, photos } = storeToRefs(ListsStore)

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore

function handleClickEdit(contact) {
  resetContactRegisterEdit()
  changeContactRegisterEdit(contact)
  contactSwitch()
}

function handleDelete(id) {
  console.log(id)
}

function handleFav(id) {
  console.log(id)
}
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
      <tr v-for="contact in contacts" :key="contact.id">
        <td>
          <img
            :alt="'Foto da ' + contact.pessoa?.name"
            class="logo"
            :src="
              'data:image/png;base64,' +
              (photos[contact.pessoa?.foto?.id]?.byteArray
                ? photos[contact.pessoa?.foto?.id]?.byteArray
                : byteArray)
            "
          />
        </td>
        <td>{{ contact.pessoa?.nome }}</td>
        <td>{{ contact.tipoContato }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleFav(contact.id)">
            <span class="not-visible">Favoritar {{ contact.name }}</span
            >F
          </button>
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
