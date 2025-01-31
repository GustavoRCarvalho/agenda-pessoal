<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/users">Usuários</RouterLink>
    <RouterLink to="/people">Pessoas</RouterLink>
    <RouterLink to="/contacts">Contatos</RouterLink>
    <RouterLink to="/myRegister">Meu Cadastro</RouterLink>
    <RouterLink to="/logout">Logout</RouterLink>
  </nav>
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
