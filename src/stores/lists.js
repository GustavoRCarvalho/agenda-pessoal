import { defineStore } from 'pinia'
import { reactive } from 'vue'
import usersService from '@/api/users'
import contactsService from '@/api/contacts'
import peopleService from '@/api/people'
import favsService from '@/api/favs'
import photoService from '@/api/photo'

export const useListsStore = defineStore('lists', {
  state: () => ({
    contacts: reactive([]),
    people: reactive([]),
    favs: reactive({}),
    users: reactive([]),
    photos: reactive({}),
  }),
  actions: {
    async setContacts(search = '') {
      const response = await contactsService.listContacts(search)
      this.contacts = response.data
    },
    async setPeople(search = '') {
      const response = await peopleService.listPeople(search)
      this.people = response.data
    },
    async setFavs() {
      // funciona como uma hash list e garante O(1) para busca
      const response = await favsService.listFavs()

      response?.data?.forEach((contact) => {
        this.favs[contact?.id] = true
      })
    },
    async setUsers(search = '') {
      const response = await usersService.listUsers(search)
      this.users = response.data
    },
    async setPhoto(id) {
      if (!id) return
      if (!this.photos[id]) {
        const response = await photoService.findPhoto(id)
        this.photos[id] = URL.createObjectURL(response.data)
      }
    },
  },
})
