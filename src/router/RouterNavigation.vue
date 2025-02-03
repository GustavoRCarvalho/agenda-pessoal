<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const AuthStore = useAuthStore()
const { logout } = AuthStore
const { tokenType, accessToken } = storeToRefs(AuthStore)
</script>
<template>
  <div v-if="accessToken !== ''">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="tokenType === 'ROLE-ADMIN'" to="/users">Usuários</RouterLink>
      <RouterLink to="/people">Pessoas</RouterLink>
      <RouterLink to="/contacts">Contatos</RouterLink>
      <RouterLink to="/myRegister">Meu Cadastro</RouterLink>
    </nav>
    <button class="default-button" @click="logout">Logout</button>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
}

nav a.router-link-exact-active {
  color: greenyellow;
}

nav a.router-link-exact-active:hover {
  background-color: red;
}
</style>
