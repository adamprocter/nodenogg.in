<template>
  <div class="node" ref="nodes">
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

  mounted() {
    var nodes = this.$refs.nodes

    this.makeDraggable(nodes)
  },
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
.node {
  background-color: aquamarine;
  position: absolute;
}
</style>
