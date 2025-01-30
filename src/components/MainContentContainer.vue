<template>
  <main>
    <slot></slot>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;

  gap: 0.5em;

  flex: 1;
  min-height: calc(50vh - 4em - 4px);

  margin: 1em;
  padding: 1em;

  border: 1px solid var(--color-gray-border);
  border-radius: 0.5em;

  @media (max-width: 720px) {
    margin: 0;
    padding: 0.3em;
  }
}

.top-wrapper {
  display: flex;
  justify-content: space-between;
}
.top-wrapper > h1 {
  margin: 0;
  font-size: 1.4em;
  font-weight: 450;
}
</style>
