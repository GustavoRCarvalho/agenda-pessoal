import { listContact, listPeople, listUsers } from '@/utils/mocks'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { byteArray } from '../assets/byteArray'

export const useListsStore = defineStore('lists', {
  state: () => ({
    contacts: reactive([]),
    people: reactive([]),
    favs: reactive([]),
    users: reactive([]),
    photos: reactive({}),
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
      this.favs = [listContact[0]]
    },
    setUsers() {
      //fetch da lista
      console.log('fetch da lista de usuarios')
      this.users = listUsers
    },
    setPhoto(id) {
      // fetch photo by id
      if (id !== null || id !== undefined) {
        this.photos[id] = {
          byteArray: byteArray,
          description: 'string',
          filename: 'string',
          inputStream: {},
          open: true,
          readable: true,
          uri: 'string',
          url: 'string',
        }
      }
    },
  },
})
