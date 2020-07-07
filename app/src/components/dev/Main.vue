<template>
  <main v-bind:class="{ inset }">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'Main',
  props: {
    inset: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="css" scoped>
main {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
}
.inset {
  padding-top: 60px;
}
</style>
