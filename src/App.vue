<script setup>
import RouterNavigation from './components/RouterNavigation.vue'
import MainContentContainer from '@/components/MainContentContainer.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <RouterNavigation />
  </header>
  <MainContentContainer>
    <RouterView />
  </MainContentContainer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
