<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import { storeToRefs } from 'pinia'
import IconEdit from '../icons/IconEdit.vue'
import IconTrash from '../icons/IconTrash.vue'
import IconLock from '../icons/IconLock.vue'
import IconLockOpen from '../icons/IconLockOpen.vue'
import { useAlertsStore } from '@/stores/alerts'
import contactsService from '@/api/contacts'

const AlertsStore = useAlertsStore()
const { createAlertError, createAlertSucess } = AlertsStore

const RegisterStore = useRegistersStore()
const {
  // changeContactRegisterEdit,
  changeContactRegisterEditNOGET,
  resetContactRegisterEdit,
} = RegisterStore

const ListsStore = useListsStore()
const { setContacts } = ListsStore
const { contacts } = storeToRefs(ListsStore)

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore

//
//  AVISO requisição /contato/listar/{id} retorna 200 mas sem dados
//
// async function handleClickEdit(id) {
//   resetContactRegisterEdit()
//   try {
//     await changeContactRegisterEdit(id)
//     createAlertSucess('Pessoa encontrada com sucesso.')
//     contactSwitch()
//   } catch (e) {
//     createAlertError(e?.message)
//   }
// }

function handleClickEditNOGET(contact) {
  resetContactRegisterEdit()
  changeContactRegisterEditNOGET(contact)
  contactSwitch()
  createAlertSucess('Pessoa encontrada com sucesso.')
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
</script>
<template>
  <table class="list-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th class="middle-table">Tipo</th>
        <th>Ferramentas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>
          <span>
            <IconLock v-if="contact.privado" class="icon-private" />
            <IconLockOpen v-else
          /></span>
          {{ contact.pessoa?.nome }}
        </td>
        <td class="middle-table">{{ contact.tipoContato }}</td>
        <td>
          <button class="tool-button edit-button" @click="handleClickEditNOGET(contact)">
            <span class="not-visible">Editar {{ contact.pessoa?.nome }}</span
            ><IconEdit /></button
          ><button class="tool-button delete-button" @click="handleDelete(contact.id)">
            <span class="not-visible">Deletar {{ contact.pessoa?.nome }}</span
            ><IconTrash />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
