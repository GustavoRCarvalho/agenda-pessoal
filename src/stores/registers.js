import {
  contactFormFields,
  libTipoContato,
  passFormFields,
  peopleFormFields,
  userFormFields,
} from '@/utils/constants'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRegistersStore = defineStore('registers', {
  state: () => ({
    peopleRegisterEdit: reactive(peopleFormFields),
    contactRegisterEdit: reactive(contactFormFields),
    userRegisterEdit: reactive(userFormFields),
    passRegisterEdit: reactive(passFormFields),
  }),
  actions: {
    changePeopleRegisterEdit(id) {
      if (id === 1) {
        //fetch by id
        this.peopleRegisterEdit = { ...peopleFormFields, id: 1, name: 'Lorem Ipsum' }
      } else {
        this.peopleRegisterEdit = { ...peopleFormFields, id: 2, name: 'Ipsum Lorem' }
      }
    },
    changeContactRegisterEdit(contact) {
      this.contactRegisterEdit = {
        ...contact,
        pessoaOption: {
          key: contact?.pessoa?.id ?? 0,
          label: contact?.pessoa?.nome ?? '',
        },
        tipoContatoOption: { key: contact.tipoContato, label: libTipoContato[contact.tipoContato] },
      }
    },
    changeUserRegisterEdit(id) {
      if (id === 1) {
        //fetch by id
        this.userRegisterEdit = {
          ...userFormFields,
          cpf: '000-000-000-00',
          dataNascimento: '2025-11-11',
          email: 'email@email.com',
          id: 1,
          nome: 'Lorem Ipsum',
          password: 'senha',
          telefone: '(23) 9 9999-9999',
          username: 'username',
        }
      } else {
        this.userRegisterEdit = {
          ...userFormFields,
          cpf: '000-000-000-00',
          dataNascimento: '2025-11-11',
          email: 'email@email.com',
          id: 2,
          nome: 'Ipsum Lorem',
          password: 'senha',
          telefone: '(23) 9 9999-9999',
          username: 'username',
        }
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
