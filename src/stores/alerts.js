import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    alerts: reactive([]),
  }),
  actions: {
    createAlertSucess(newMessage) {
      if (newMessage !== '' && !this.alerts.map(({ message }) => message).includes(newMessage)) {
        this.alerts.push({ message: newMessage, color: '#00a708' })
      }
    },
    createAlertWarning(newMessage) {
      if (newMessage !== '' && !this.alerts.map(({ message }) => message).includes(newMessage)) {
        this.alerts.push({ message: newMessage, color: '#d4b500' })
      }
    },
    createAlertError(newMessage) {
      if (newMessage !== '' && !this.alerts.map(({ message }) => message).includes(newMessage)) {
        this.alerts.push({ message: newMessage, color: '#ff4747' })
      }
    },
    removeAlert(oldMessage) {
      const index = this.alerts.map(({ message }) => message).indexOf(oldMessage)
      if (index === -1) return
      this.alerts.splice(index, 1)
    },
  },
})
