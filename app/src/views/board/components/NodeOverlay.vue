<template>
  <div class="board-overlay" v-bind:style="{ backgroundColor }">
    <router-link v-bind:to="back">Back</router-link>
    <div class="inner" v-bind:inner-html.prop="markdownToHTML" />
  </div>
</template>
<script>
import marked from 'marked'

export default {
  props: {
    back: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    node_id: {
      type: String,
      required: true,
    },
  },
  computed: {
    markdownToHTML() {
      return marked(this.text)
    },
  },
}
</script>

<style scoped>
.board-overlay {
  position: absolute;
  top: 0;
  left: 200px;
  z-index: 50;
  width: calc(100vw - 200px);
  height: 100vh;
  background: white;
  padding: 40px;
  box-shadow: 0 3px 4px 0px rgba(0, 0, 0, 0.1);
}
div {
}
.inner {
}
.inner > h1 {
  font-size: 48px;
}
.inner > h2 {
  font-size: 36px;
}
.inner > h3 {
  font-size: 28px;
}
</style>
