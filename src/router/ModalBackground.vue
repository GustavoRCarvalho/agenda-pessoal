<script setup>
const emit = defineEmits(['closeModal'])

function closeOnCheckingId(e) {
  if (e.target.id === 'modal-id') {
    emit('closeModal')
  }
}
</script>

<template>
  <div role="dialog" id="modal-id" class="modal-back" @click="closeOnCheckingId">
    <slot></slot>
  </div>
</template>
<style scoped>
.modal-back {
  position: absolute;
  left: 0;
  top: 0;

  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #0000002f;
}
</style>
