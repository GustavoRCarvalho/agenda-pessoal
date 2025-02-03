import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: ref(localStorage.getItem('accessToken') ?? ''),
    tokenType: ref(localStorage.getItem('tokenType') ?? ''),
    id: ref(localStorage.getItem('id') ?? null),
  }),
  actions: {
    login(credentials) {
      //fetch login
      return new Promise((resolve, reject) => {
        if (credentials.username !== 'CBA') {
          setTimeout(() => {
            const response = { accessToken: 'ABC', id: 1, tokenType: 'ROLE-ADMIN' }

            const { accessToken, id, tokenType } = response

            console.log(response)

            if (credentials.remember) {
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('tokenType', tokenType)
              localStorage.setItem('id', id)
            }
            this.accessToken = accessToken
            this.tokenType = tokenType
            this.id = id

            resolve()
          }, 1000)
        } else {
          reject('Usuário Incorreto')
        }
      })
    },
    logout() {
      this.accessToken = ''
      this.tokenType = ''
      this.id = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('tokenType')
      localStorage.removeItem('id')
    },
  },
})
