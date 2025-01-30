import { contactFormFields, peopleFormFields } from '@/utils/constants'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRegistersStore = defineStore('registers', {
  state: () => ({
    peopleRegisterEdit: reactive(peopleFormFields),
    contactRegisterEdit: reactive(contactFormFields),
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
    resetPeopleRegisterEdit() {
      this.peopleRegisterEdit = peopleFormFields
    },
    changeContactRegisterEdit(id) {
      if (id === 1) {
        //fetch by id
        this.contactRegisterEdit = {
          ...contactFormFields,
          id: 2,
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
          id: 1,
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
    resetContactRegisterEdit() {
      this.contactRegisterEdit = contactFormFields
    },
  },
})
