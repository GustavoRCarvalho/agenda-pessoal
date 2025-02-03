<script setup>
import RouterNavigation from './router/RouterNavigation.vue'
import MainContentContainer from '@/components/MainContentContainer.vue'
import ModalsController from './router/ModalsController.vue'
import { onMounted } from 'vue'

import { useUserStore } from '@/stores/user'
import AlertController from './components/alerts/AlertController.vue'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useAuthStore } from './stores/auth'
import router from '@/router'

const UserStore = useUserStore()
const { setUser, unsetUser } = UserStore

const AuthStore = useAuthStore()
const { accessToken, id } = storeToRefs(AuthStore)

onMounted(() => {
  if (accessToken && id) {
    setUser(id)
  }
})

watch(id, (newId) => {
  if (newId) {
    setUser(newId)
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
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <RouterNavigation />
  </header>
  <MainContentContainer>
    <RouterView />
    <ModalsController />
    <AlertController />
  </MainContentContainer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
