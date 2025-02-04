import { defineStore } from 'pinia'
import { reactive } from 'vue'
import usersService from '@/api/users'
import { libTiposUser, userFormFields } from '@/utils/constants'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: reactive(userFormFields),
  }),
  actions: {
    async setUser(id) {
      const response = await usersService.findUser(id)
      const infos = response.data.object

      this.user = {
        ...infos.usuario,
        tipoOption: {
          key: infos.tipos[0],
          label: libTiposUser[infos.tipos],
        },
      }
    },
    unsetUser() {
      this.user = {}
    },
  },
})
