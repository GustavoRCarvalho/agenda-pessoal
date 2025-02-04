import authService from '@/api/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: ref(localStorage.getItem('accessToken') || ''),
    userType: ref(localStorage.getItem('userType') || ''),
    id: ref(localStorage.getItem('id') || null),
  }),
  actions: {
    async login(credentials) {
      const response = await authService.login({
        username: credentials.username,
        password: credentials.password,
      })

      const { accessToken, id, tipos } = response.data

      if (credentials.remember) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('userType', tipos[0])
        localStorage.setItem('id', id)
      }
      this.accessToken = accessToken
      this.userType = tipos[0]
      this.id = id
    },
    logout() {
      this.accessToken = ''
      this.userType = ''
      this.id = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userType')
      localStorage.removeItem('id')
    },
  },
})
