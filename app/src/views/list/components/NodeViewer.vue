<template>
  <div class="viewer" v-bind:style="{ backgroundColor }">
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
  data() {
    return {
      editorOptions: {
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: false,
        hideModeSwitch: false,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'ul',
          'ol',
          'task',
        ],
      },
    }
  },
}
</script>

<style scoped>
.viewer {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 50;
  width: 60vw;
  height: 100vh;
  background: white;
  padding: 40px;
  box-shadow: -4px 0px 1px 0px rgba(0, 0, 0, 0.075);
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
