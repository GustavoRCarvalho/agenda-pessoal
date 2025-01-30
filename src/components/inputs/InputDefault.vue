<script setup>
import { watch } from 'vue'
import { nextTick } from 'vue'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  needFocus: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  mask: { type: String, default: null },
})
const model = defineModel()

const isFocus = ref(props.needFocus)
const inputRef = useTemplateRef('inputRef')

watch(
  () => props.needFocus,
  async (newValue) => {
    if (!!inputRef.value && !newValue) {
      return
    }
    // Dom update checker por que o componente não é destruido e, por tanto, não é remontado
    await nextTick()
    inputRef.value.focus()
  },
)

function focusHasChange(bool) {
  isFocus.value = bool
}
</script>
<template>
  <div>
    <label :for="name" :class="{ active: model || isFocus }">{{ label }}</label>
    <input
      v-if="mask"
      ref="inputRef"
      :type="type"
      v-model="model"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      v-mask="mask"
      @focusin="focusHasChange(true)"
      @focusout="focusHasChange(false)"
      required
    />
    <input
      v-else
      ref="inputRef"
      :type="type"
      v-model="model"
      :name="name"
      :id="name"
      :placeholder="placeholder"
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
