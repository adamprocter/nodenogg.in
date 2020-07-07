<template>
  <div v-bind:style="{ backgroundColor }" class="overlay">
    <router-link v-bind:to="back">Back</router-link>
    <h2>{{ text }}</h2>
  </div>
</template>
<script>
export default {
  props: {
    back: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF',
    },
    node_id: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 50;
  width: 50vw;
  height: 100vh;
  background: white;
  padding: 40px;
  box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.19);
}
</style>
