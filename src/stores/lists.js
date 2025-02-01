import { listContact, listPeople, listUsers } from '@/utils/mocks'
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
      console.log('fetch da lista de contatos')
      this.contacts = listContact
    },
    setPeople() {
      //fetch da lista
      console.log('fetch da lista de pessoas')
      this.people = listPeople
    },
    setFavs() {
      //fetch da lista
      console.log('fetch da lista de favoritos')
      this.favs = listContact
    },
    setUsers() {
      //fetch da lista
      console.log('fetch da lista de usuarios')
      this.users = listUsers
    },
  },
})
