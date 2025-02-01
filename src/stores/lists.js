import { listContact, listPeople } from '@/utils/mocks'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useListsStore = defineStore('lists', {
  state: () => ({
    contacts: reactive([]),
    people: reactive([]),
    favs: reactive([]),
    users: reactive([]),
  }),
  actions: {
    setContacts() {
      //fetch da lista
      this.contacts = listContact
    },
    setPeople() {
      //fetch da lista
      this.people = listPeople
    },
    setFavs() {
      //fetch da lista
      this.favs = []
    },
    setUsers() {
      //fetch da lista
      this.users = []
    },
  },
})
