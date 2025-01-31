import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', {
  state: () => ({
    peopleModal: ref(false),
    contactModal: ref(false),
    userModal: ref(false),
  }),
  actions: {
    peopleSwitch() {
      this.peopleModal = !this.peopleModal
    },
    contactSwitch() {
      this.contactModal = !this.contactModal
    },
    userSwitch() {
      this.userModal = !this.userModal
    },
  },
})
