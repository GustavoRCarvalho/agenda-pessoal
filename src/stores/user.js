import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: reactive({}),
  }),
  actions: {
    setUser(id) {
      //fetch pelo id
      if (id) {
        this.user = {
          id: 1,
          nome: 'Lorem Ipsum',
          email: 'email@email.com',
          telefone: '(23) 9 9999-9999',
          cpf: '000-000-000-00',
          dataNascimento: '2025.11.11',
          username: 'username',
          password: 'senha',
        }
      }
    },
  },
})
