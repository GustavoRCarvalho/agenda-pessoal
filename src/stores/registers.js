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
          id: 1,
          email: '1email@email.com',
          pessoa_selected: {
            key: 0,
            label: 'Lorem Ipsum',
          },
          tipoContato: { key: 'TELEFONE', label: 'TELEFONE' },
        }
      } else {
        this.contactRegisterEdit = {
          ...contactFormFields,
          id: 2,
          email: '2email@email.com',
          pessoa_selected: {
            key: 1,
            label: 'Ipsum Lorem',
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
