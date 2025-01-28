import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', {
  state: () => ({
    peopleModal: ref(false),
  }),
  actions: {
    peopleSwitch() {
      this.peopleModal = !this.peopleModal
    },
  },
})
