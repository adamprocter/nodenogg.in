<template>
  <article v-on:click="handleClick">
    <router-link v-if="!blank" v-bind:to="link">
      <div v-bind:style="{ backgroundColor }" />
      <span v-bind:inner-html.prop="markdownToHTML" />
    </router-link>
    <span v-else>Create new node</span>
  </article>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ListNodeItem',
  methods: {
    handleClick() {
      if (this.blank) {
        this.$emit('click')
      }
    },
  },
  computed: {
    markdownToHTML() {
      return marked(this.text)
    },
  },
  props: {
    blank: {
      type: Boolean,
    },
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
  padding: 20px;
  min-height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
div {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}
a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
