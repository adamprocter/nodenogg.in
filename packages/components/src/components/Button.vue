<script>
export default {
  name: "Button"
};
</script>

<template>
  <button v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped>
button {
  border: none;
  background: var(--dark-mono);
  color: white;
  padding: 10px;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  border-radius: 6px;
}
</style>
