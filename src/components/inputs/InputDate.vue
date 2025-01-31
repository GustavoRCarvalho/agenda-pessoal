<script setup>
import { gerateDateMask } from '@/utils/functions'
import { computed } from 'vue'
import { ref } from 'vue'

const model = defineModel()
const isFocus = ref(false)

function focusHasChange(bool) {
  isFocus.value = bool
}

//verificação de data
const dateTokens = computed(() => {
  return gerateDateMask(model.value)
})
</script>
<template>
  <div>
    <label for="phone" :class="{ active: model || isFocus }">Data de Nascimento</label>
    <input
      type="tel"
      name="phone"
      placeholder="1970.12.31"
      v-model="model"
      v-mask="dateTokens"
      @focusin="focusHasChange(true)"
      @focusout="focusHasChange(false)"
      required
    />
  </div>
</template>

<style scoped>
div {
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
  width: 100%;
  border-radius: 0.25em;

  &::placeholder {
    color: transparent;

    transition: 0.3s ease;
  }
  &:focus {
    &::placeholder {
      color: #b4b4b4;
    }
  }
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
