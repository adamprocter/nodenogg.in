<script>
export default {
  name: "Button" // vue component name
};
</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  border: none;
  background: rgb(20, 40, 150);
  color: white;
  padding: 10px;
  outline: none;
}
</style>
