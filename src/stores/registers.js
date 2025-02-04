import {
  contactFormFields,
  libTipoContato,
  optionsTiposUser,
  passFormFields,
  peopleFormFields,
  userFormFields,
} from '@/utils/constants'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

import usersService from '@/api/users'
import _contactsService from '@/api/contacts'
import peopleService from '@/api/people'

export const useRegistersStore = defineStore('registers', {
  state: () => ({
    peopleRegisterEdit: reactive(peopleFormFields),
    contactRegisterEdit: reactive(contactFormFields),
    userRegisterEdit: reactive(userFormFields),
    passRegisterEdit: reactive(passFormFields),
  }),
  actions: {
    async changePeopleRegisterEdit(id) {
      const response = await peopleService.findPeople(id)
      console.log(response?.data?.object)
      this.peopleRegisterEdit = response?.data?.object
    },
    changeContactRegisterEditNOGET(contact) {
      this.contactRegisterEdit = {
        ...contact,
        pessoaOption: {
          key: contact?.pessoa?.id ?? 0,
          label: contact?.pessoa?.nome ?? '',
        },
        tipoContatoOption: {
          key: contact.tipoContato,
          label: libTipoContato[contact.tipoContato],
        },
      }
    },
    // async changeContactRegisterEdit(id) {
    //
    //  AVISO requisição /contato/listar/{id} retorna 200 mas sem dados
    //  ATT: aparentemente a busca por contato esta buscando pelo id da pessoa dentro do contato
    //
    // const response = await contactsService.findContact(id)
    // this.contactRegisterEdit = response.object
    // this.contactRegisterEdit = {
    //   ...response.object,
    //   pessoaOption: {
    //     key: response.object?.pessoa?.id ?? 0,
    //     label: response.object?.pessoa?.nome ?? '',
    //   },
    //   tipoContatoOption: {
    //     key: response.object.tipoContato,
    //     label: libTipoContato[response.object.tipoContato],
    //   },
    // }
    // },
    async changeUserRegisterEdit(id) {
      const response = await usersService.findUser(id)
      const infos = response.data.object

      this.userRegisterEdit = {
        ...infos.usuario,
        tipoOption: {
          key: infos.tipos[0],
          label: optionsTiposUser[infos.tipos],
        },
      }
    },
    resetPeopleRegisterEdit() {
      this.peopleRegisterEdit = peopleFormFields
    },
    resetContactRegisterEdit() {
      this.contactRegisterEdit = contactFormFields
    },
    resetUserRegisterEdit() {
      this.userRegisterEdit = userFormFields
    },
    resetPassRegisterEdit() {
      this.passRegisterEdit = passFormFields
    },
  },
})
