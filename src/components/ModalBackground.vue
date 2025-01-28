<script setup>
const emit = defineEmits(['closeModal'])

function closeOnCheckingId(e) {
  if (e.target.id === 'modal-id') {
    emit('closeModal')
  }
}
</script>

<template>
  <div id="modal-id" class="modal-container" @click="closeOnCheckingId">
    <slot></slot>
  </div>
</template>
<style scoped>
.modal-container {
  position: absolute;
  left: 0;
  top: 0;

  width: 100dvw;
  height: 100dvh;
  background-color: #0000002f;
}
</style>
