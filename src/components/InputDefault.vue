<script setup>
import { ref } from 'vue'

defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  mask: { type: String, default: null },
})
const model = defineModel()

const isFocus = ref(false)

function focusHasChange(bool) {
  isFocus.value = bool
}
</script>
<template>
  <div>
    <label :for="name" :class="{ active: model || isFocus }">{{ label }}</label>
    <input
      v-if="mask"
      :type="type"
      v-model="model"
      :name="name"
      :id="name"
      v-mask="mask"
      @focusin="focusHasChange(true)"
      @focusout="focusHasChange(false)"
      required
    />
    <input
      v-else
      :type="type"
      v-model="model"
      :name="name"
      :id="name"
      @focusin="focusHasChange(true)"
      @focusout="focusHasChange(false)"
      :maxlength="200"
      required
    />
  </div>
</template>

<style scoped>
div {
  position: relative;
  margin-block: 1em;
  margin-left: 1em;
  padding: 0.25em;

  border: 1px solid var(--color-label);
  border-radius: 0.25em;

  width: 14em;

  @media (max-width: 1024px) {
    width: 10em;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
}
input {
  font-size: 1em;
  outline: none;
  border: none;

  padding: 0;
  width: 14em;

  @media (max-width: 1024px) {
    width: 10em;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
  border-radius: 0.25em;
}
label {
  position: absolute;
  font-size: 1em;
  left: 0.2em;
  top: 0.25em;
  color: var(--color-label);
  background-color: white;
  padding: 0 0.25em;
  transition: all 0.3s ease;
  pointer-events: none;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 85%;
  border-radius: 0.25em;
}
label.active {
  font-size: 0.8em;
  top: -0.75em;
}
</style>
