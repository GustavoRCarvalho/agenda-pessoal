<script setup>
import { useAlertsStore } from '@/stores/alerts'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import AlertCard from './AlertCard.vue'

const AlertsStore = useAlertsStore()
const { removeAlert } = AlertsStore
const { alerts } = storeToRefs(AlertsStore)

watch(alerts.value, (alert) => {
  if (!alert.length) return
  setTimeout(() => {
    removeAlert(alert[0]?.message)
  }, 4000)
})
function handleRemove(message) {
  setTimeout(() => {
    removeAlert(message)
  }, 500)
}
// Isso ficou muito bom
</script>
<template>
  <ul>
    <AlertCard
      v-for="alert in alerts"
      :key="alert.message"
      :message="alert.message"
      :color="alert.color"
      :handleRemove="handleRemove"
    />
  </ul>
</template>
<style scoped>
ul {
  list-style: none;
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: end;

  padding: 0;
  margin: 0;
  gap: 1em;

  right: 1em;
  bottom: 1em;
}
</style>
