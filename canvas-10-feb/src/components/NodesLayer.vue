<template>
  <div class="editor">
    <form id="editForm" class="myScroll">
      <textarea></textarea>
      <p>markdown supported</p>
      <button>delete</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { drag } from './mixins/drag.js'

export default {
  name: 'NodesLayer',
  mixins: [drag],

  mounted() {},
  methods: {
    setFocus() {
      this.$refs.notetext.focus()
    },
    editNodeText() {},
    deleteFlag() {}
  },
  computed: mapState({})
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editor {
  background-color: aquamarine;
  position: absolute;
}
</style>
