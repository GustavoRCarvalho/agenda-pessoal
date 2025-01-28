import { peopleFormFields } from '@/components/utils/constants'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useRegistersStore = defineStore('registers', {
  state: () => ({
    peopleRegisterEdit: reactive(peopleFormFields),
  }),
  actions: {
    changePeopleRegisterEdit(id) {
      if (id) {
        //fetch by id
        this.peopleRegisterEdit = { ...peopleFormFields, id: '123123', name: 'Lorem Ipsum' }
      }
    },
    resetPeopleRegisterEdit() {
      this.peopleRegisterEdit = peopleFormFields
    },
  },
})
