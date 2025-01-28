<template>
  <main>
    <slot></slot>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;

  flex: 1;
  min-height: calc(100vh - 4em - 4px);

  margin: 1em;
  padding: 1em;

  border: 1px solid black;
  border-radius: 0.5em;
}

.top-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
