<template>
  <div ref="nodes" class="node">
    <form id="editForm" class="myScroll">
      <textarea @input="editNode" v-model="thistext" :id="nodeid"></textarea>
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
  // FIXME : these probably need to be data or computed and not props
  props: { nodeid: Number, nodetext: String },

  data() {
    return {
      thistext: this.nodetext
    }
  },

  mounted() {
    var nodes = this.$refs.nodes
    this.makeDraggable(nodes)
  },
  methods: {
    setFocus() {
      // this.$refs.nodetext.focus()
    },
    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },
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
