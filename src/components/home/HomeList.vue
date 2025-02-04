<script setup>
import { byteArray } from '@/assets/byteArray'
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'
import IconStar from '../icons/IconStar.vue'
import IconEdit from '../icons/IconEdit.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconStarFilled from '../icons/IconStarFilled.vue'
import { useAlertsStore } from '@/stores/alerts'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const RegisterStore = useRegistersStore()
const { changeContactRegisterEdit, resetContactRegisterEdit } = RegisterStore

const ListsStore = useListsStore()
const { contacts, favs, photos } = storeToRefs(ListsStore)

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore

async function handleClickEdit(id) {
  resetContactRegisterEdit()

  try {
    await changeContactRegisterEdit(id)
    createAlertSucess('Pessoa encontrada com sucesso.')
    contactSwitch()
  } catch (e) {
    createAlertError(e?.message)
  }
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
          <button
            class="tool-button edit-button"
            :class="favs[contact.id] && 'isFav'"
            @click="handleFav(contact.id)"
          >
            <span class="not-visible">Favoritar {{ contact.name }}</span
            ><IconStarFilled v-if="favs[contact.id]" />
            <IconStar v-else />
          </button>
          <button class="tool-button edit-button" @click="handleClickEdit(contact.id)">
            <span class="not-visible">Editar {{ contact.name }}</span
            ><IconEdit /></button
          ><button class="tool-button delete-button" @click="handleDelete(contact.id)">
            <span class="not-visible">Deletar {{ contact.name }}</span
            ><IconTrash />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.isFav {
  color: red;
}
</style>
