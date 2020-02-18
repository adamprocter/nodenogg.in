<template>
  <div ref="nodes" class="node" v-bind:id="nodeid">
    <form id="editForm" class="myScroll">
      <textarea v-model="nodetext"></textarea>
      <p>markdown supported</p>
      <button>delete</button>
    </form>
  </div>
</template>

<script>
import { drag } from './mixins/drag.js'

export default {
  name: 'NodesLayer',
  mixins: [drag],
  // FIXME : these probably need to be data/ computed and not props
  // as will be editable
  props: { nodetext: String, nodeid: Number },

  // data() {
  //   return {
  //
  //   }
  // },

  mounted() {
    var nodes = this.$refs.nodes
    this.makeDraggable(nodes)
  },
  methods: {
    setFocus() {
      this.$refs.nodetext.focus()
    },
    editNodeText() {},
    deleteFlag() {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.node {
  background-color: aquamarine;
  position: absolute;
}
</style>
