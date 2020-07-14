<template>
  <article v-bind:style="{ backgroundColor }">
    {{ text }}
    <router-link v-bind:to="link">Open</router-link>
  </article>
</template>

<script>
export default {
  name: 'NodeBoardItem',
  props: {
    backgroundColor: {
      type: String,
    },
    text: {
      type: String,
    },
    link: {
      type: String,
    },
  },
}
</script>
<style scoped>
article {
  width: calc(25% - 20px);
  padding: 20px;
  margin: 10px;
  background: rgba(0, 0, 0, 0.1);
  max-width: 600px;
  min-height: 220px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
