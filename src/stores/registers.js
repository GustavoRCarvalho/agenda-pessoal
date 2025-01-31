import { contactFormFields, peopleFormFields, userFormFields } from '@/utils/constants'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRegistersStore = defineStore('registers', {
  state: () => ({
    peopleRegisterEdit: reactive(peopleFormFields),
    contactRegisterEdit: reactive(contactFormFields),
    userRegisterEdit: reactive(userFormFields),
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
    changeContactRegisterEdit(id) {
      if (id === 1) {
        //fetch by id
        this.contactRegisterEdit = {
          ...contactFormFields,
          id: 1,
          telefone: '(011) 9 9823-8765',
          pessoa: {
            key: 1,
            label: 'Ipsum Lorem',
          },
          tipoContato: { key: 'TELEFONE', label: 'TELEFONE' },
        }
      } else if (id === 2) {
        this.contactRegisterEdit = {
          ...contactFormFields,
          id: 2,
          email: '1email@email.com',
          pessoa: {
            key: 0,
            label: 'Lorem Ipsum',
          },
          tipoContato: { key: 'EMAIL', label: 'EMAIL' },
        }
      } else {
        this.contactRegisterEdit = {
          ...contactFormFields,
          id: 3,
          telefone: '(22) 5 2823-1231',
          pessoa: {
            key: 1,
            label: 'Lorem Lorem',
          },
          tipoContato: { key: 'CELULAR', label: 'CELULAR' },
        }
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
  },
})
