<script setup>
import VueSelect from 'vue-select'

defineProps({
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  options: { type: Array, default: () => [] },
})
const model = defineModel()
</script>
<template>
  <div class="input-wrapper">
    <VueSelect v-model="model" :options="options" :name="name">
      <template #search="{ attributes, events }">
        <input class="vs__search" :required="!model?.key" v-bind="attributes" v-on="events" />
      </template>
    </VueSelect>
    <label :for="name">{{ label }}</label>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;

  margin-block: 0.6em;
}
div {
  flex-grow: 1;
  max-width: 14.7em;

  @media (max-width: 720px) {
    max-width: unset;
  }
}
label {
  position: absolute;
  font-size: 0.8em;

  top: -0.75em;
  left: 0.25em;

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
