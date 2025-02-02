<script setup>
import RouterNavigation from './router/RouterNavigation.vue'
import MainContentContainer from '@/components/MainContentContainer.vue'
import ModalsController from './router/ModalsController.vue'
import { onMounted } from 'vue'

import { useUserStore } from '@/stores/user'
import AlertController from './components/alerts/AlertController.vue'
const UserStore = useUserStore()
const { setUser } = UserStore

onMounted(() => {
  setUser(1)
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
