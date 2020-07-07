<template lang="html">
  <nav>
    <slot />
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
  width: initial;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
</style>
