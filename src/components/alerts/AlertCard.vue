<script setup>
defineProps({
  message: { type: String },
  color: { type: String },
  handleRemove: { type: Function },
})
</script>
<template>
  <li :style="`background-color: ${color};`">
    <span>{{ message }}</span>
    <button @click="handleRemove(message)"><span class="not-visible">Fechar Alerta</span>X</button>
  </li>
</template>
<style scoped>
li {
  color: #fff;
  width: max-content;

  display: flex;
  align-items: center;

  padding: 0.5em 1em;
  border-radius: 0.5em;

  gap: 0.5em;
  transform: translateX(1em);
  opacity: 0;

  transition: all 0.3s ease-out;
  animation-name: fadeAdd, fadeActive, fadeRemove, fadeDeactivate;
  animation-delay: 0s, 0.5s, 3.5s, 4s;
  animation-duration: 0.5s, 3s, 0.5s, 10s;
  animation-timing-function: ease-out;
}

button {
  background-color: transparent;

  border: none;
  cursor: pointer;
  color: #fff;
}

@keyframes fadeActive {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeAdd {
  from {
    transform: translateX(1em);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeRemove {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(1em);
    opacity: 0;
  }
}
@keyframes fadeDeactivate {
  from {
    transform: translateX(1em);
    opacity: 0;
  }
  to {
    transform: translateX(1em);
    opacity: 0;
  }
}
</style>
