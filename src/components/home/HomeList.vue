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
import favsService from '@/api/favs'
import contactsService from '@/api/contacts'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const RegisterStore = useRegistersStore()
const { changeContactRegisterEdit, resetContactRegisterEdit } = RegisterStore

const ListsStore = useListsStore()
const { setContacts } = ListsStore
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

async function handleDelete(id) {
  if (id) {
    try {
      await contactsService.deleteContact(id)
      createAlertSucess('Sucesso ao excluir o contato.')
      setContacts()
    } catch (e) {
      if (e.status === 404 || e?.response?.data?.message) {
        createAlertError('Erro ao salvar o usuário!')
      }
      createAlertError(e?.response?.data?.message)
    }
  }
}

async function handleFav(contact) {
  if (!favs.value[contact.id]) {
    try {
      await favsService.postFavs(contact)
      createAlertSucess('Sucesso ao adicionar novo favorito.')
      favs.value[contact.id] = contact
    } catch (e) {
      if (e.status === 404 || e?.response?.data?.message) {
        createAlertError('Erro ao adicionar favorito!')
      }
      createAlertError(e?.response?.data?.message)
    }
  } else {
    try {
      await favsService.deleteFavs(contact.id)
      delete favs.value[contact.id]
      createAlertSucess('Sucesso ao remover favorito.')
    } catch (e) {
      if (e.status === 404 || e?.response?.data?.message) {
        createAlertError('Erro ao remover favorito!')
      }
      createAlertError(e?.response?.data?.message)
    }
  }
}
</script>
<template>
  <table class="list-table">
    <thead>
      <tr>
        <th></th>
        <th>Nome</th>
        <th class="middle-table">Tipo</th>
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
              photos[contact.pessoa?.id]
                ? photos[contact.pessoa?.id]
                : 'data:image/png;base64,' + byteArray
            "
          />
        </td>
        <td>{{ contact.pessoa?.nome }}</td>
        <td class="middle-table">{{ contact.tipoContato }}</td>
        <td>
          <button
            class="tool-button edit-button"
            :class="favs[contact.id] && 'isFav'"
            @click="handleFav(contact)"
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
