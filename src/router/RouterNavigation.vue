<script setup>
import IconLeft from '@/components/icons/IconLeft.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const AuthStore = useAuthStore()
const { logout } = AuthStore
const { userType, accessToken } = storeToRefs(AuthStore)

const openNav = ref(false)

function handleClick() {
  openNav.value = !openNav.value
}
</script>
<template>
  <button class="open-button" v-show="!openNav && accessToken" @click="handleClick">☰</button>
  <main :class="{ 'main-nav-open': openNav, 'not-auth': !accessToken }">
    <slot></slot>
  </main>
  <div
    class="navigation-container"
    :class="openNav && 'navigation-open'"
    v-show="openNav"
    v-if="accessToken !== ''"
  >
    <nav>
      <button :class="'close-button'" @click="handleClick"><IconLeft /></button>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="userType === 'ROLE_ADMIN'" to="/users">Usuários</RouterLink>
      <RouterLink to="/people">Pessoas</RouterLink>
      <RouterLink to="/contacts">Contatos</RouterLink>
      <RouterLink to="/myRegister">Meu Cadastro</RouterLink>
    </nav>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  padding: 0;

  :nth-child(2) {
    margin-top: 2em;
  }
  a {
    display: block;

    text-decoration: none;
    font-size: 1em;

    color: #818181;

    padding: 1em 0.5em 1em 2em;

    transition: 0.3s;

    &:hover {
      color: #222;
      background: linear-gradient(0.25turn, #ddd, transparent);
    }
  }
}

nav a.router-link-exact-active {
  color: rgb(228, 0, 0);
}

.navigation-container {
  position: fixed;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  top: 0;
  left: 0;

  height: calc(100dvh - 1.5em);

  width: 0;
  padding-top: 0;

  background-color: transparent;

  overflow-x: hidden;
  transition: 0.3s;

  @media (max-width: 720px) {
    background-color: var(--background-body);
  }
}
.navigation-open {
  width: 15em;
  height: calc(100dvh - 2em - 2px);
  padding-top: 1em;

  @media (max-width: 720px) {
    width: 100%;
  }
}

.close-button {
  position: absolute;
  font-size: 1em;
  width: 2em;
  height: 2em;

  padding: 0;
  border-radius: 0.4em;

  top: 0.5em;
  right: 1em;

  color: #818181;

  cursor: pointer;

  &:hover {
    color: #222;
    background-color: #eeeeee;
  }
}

.open-button {
  position: absolute;
  font-size: 1.25em;

  background-color: transparent;
  color: black;

  border: none;
  border-radius: 0.4em;

  padding: 0.5em 0.8em;
  margin-top: 1em;
  margin-left: 1em;

  cursor: pointer;

  transition: 0.1s;
  &:hover {
    background-color: #ddd;
  }
}
.logout-button {
  background-color: transparent;

  border: 1px solid var(--color-gray-border);
  border-radius: 0.25em;

  padding: 1em;
  margin: 1em 0.5em 1em 2em;

  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #00000008;
  }
}

main {
  display: flex;
  flex-direction: column;
  margin: 1.5em;
  margin-left: 1.5em;
  margin-top: 5em;

  max-width: 1400px;
  min-height: calc(100dvh - 7em);

  border: 1px solid var(--color-gray-border);
  border-radius: 0.8em;

  transition:
    margin-left 0.3s,
    margin-top 0.3s;

  @media (min-width: 1400px) {
    margin-inline: auto;
  }
  @media (min-width: calc(1400px + 30em)) {
    margin-inline: auto;
  }
  @media (max-width: 720px) {
    margin-left: 1.5em;
  }
}
.main-nav-open {
  margin-left: 15em;
  margin-top: 1.5em;
  min-height: calc(100dvh - 3.5em);

  @media (min-width: 1400px) {
    margin-left: 15em;
  }
  @media (min-width: calc(1400px + 30em)) {
    margin-inline: auto;
  }
}
.not-auth {
  margin: 1.5em;
  height: calc(100dvh - 3em);

  @media (min-width: calc(1400px)) {
    margin-inline: auto;
  }
}
</style>
