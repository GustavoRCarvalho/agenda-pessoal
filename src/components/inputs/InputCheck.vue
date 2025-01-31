<script setup>
defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: '' },
})
const model = defineModel()
</script>
<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input type="checkbox" v-model="model" :name="name" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-block: 0.6em;
  padding: 0.25em;

  border: 1px solid var(--color-gray-border);
  border-radius: 0.25em;

  width: calc(100% - 0.5em - 2px);
  max-width: 14em;

  @media (max-width: 720px) {
    max-width: unset;
  }
}
input {
  font-size: 1em;
  outline: none;
  border: none;

  padding: 0;
}
input[type='checkbox'] {
  border-radius: 50em;
  margin: 0;
  box-sizing: content-box;
  height: 1.3em;
  aspect-ratio: 1;
}
input:checked {
  accent-color: #45ee4a;
  color: white;
}

label {
  font-size: 1em;
  color: var(--color-label);
  background-color: white;
  padding: 0 0.25em;
  transition: all 0.3s ease;
  pointer-events: none;

  white-space: nowrap;

  max-width: 85%;
  border-radius: 0.25em;
}
</style>
