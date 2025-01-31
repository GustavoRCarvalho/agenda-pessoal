import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useModalsStore = defineStore('modals', {
  state: () => ({
    user: reactive(null),
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
          dataNascimento: '2025-11-11',
          username: 'username',
          password: 'senha',
        }
      }
    },
  },
})
