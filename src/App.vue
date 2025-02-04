<script setup>
import RouterNavigation from './router/RouterNavigation.vue'
import ModalsController from './router/ModalsController.vue'
import { onMounted } from 'vue'

import { useUserStore } from '@/stores/user'
import AlertController from './components/alerts/AlertController.vue'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useAuthStore } from './stores/auth'
import router from '@/router'
import { useAlertsStore } from './stores/alerts'

const AlertsStore = useAlertsStore()
const { createAlertSucess, createAlertError } = AlertsStore

const UserStore = useUserStore()
const { setUser, unsetUser } = UserStore

const AuthStore = useAuthStore()
const { accessToken, id } = storeToRefs(AuthStore)

onMounted(async () => {
  if (accessToken && id) {
    try {
      await setUser(id.value)
      createAlertSucess('Dados carregados com sucesso!')
    } catch (e) {
      if (e.status === 404 || e?.response?.data?.message) {
        createAlertError('Não foi possível carregar os dados!')
      }
      createAlertError(e?.response?.data?.message)
    }
  }
})

watch(id, async (newId) => {
  if (newId) {
    try {
      await setUser(newId)
      createAlertSucess('Dados carregados com sucesso!')
    } catch (e) {
      if (e.status === 404 || e?.response?.data?.message) {
        createAlertError('Não foi possível carregar os dados!')
      }
      createAlertError(e?.response?.data?.message)
    }
  } else {
    unsetUser()
  }
})
watch(accessToken, (newToken) => {
  if (newToken === '') {
    router.push('/login')
  }
})
</script>

<template>
  <RouterNavigation> <RouterView /></RouterNavigation>
  <ModalsController />
  <AlertController />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
