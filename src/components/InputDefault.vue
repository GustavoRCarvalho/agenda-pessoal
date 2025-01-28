<script setup>
defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  mask: { type: String, default: null },
})
const model = defineModel()
</script>
<template>
  <div>
    <label for="name">{{ label }}</label>
    <input
      v-if="mask"
      :type="type"
      v-model="model"
      :name="name"
      :id="name"
      v-mask="mask"
      :placeholder="placeholder"
      required
    />
    <input
      v-else
      :type="type"
      v-model="model"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :maxlength="200"
      required
    />
  </div>
</template>
