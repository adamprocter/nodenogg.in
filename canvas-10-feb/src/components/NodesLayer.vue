<template>
  <!-- make container draggable using ref suppose to help with rapid dragging, DOESNT -->
  <div ref="nodes">
    <div class="node">
      <form id="editForm" class="myScroll">
        <textarea ref="notetext" v-model="nodetext"></textarea>

        <p>{{ nodetext }} markdown supported</p>
        <button>delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import { drag } from './mixins/drag.js'

export default {
  name: 'NodesLayer',
  mixins: [drag],

  props: {
    nodetext: String
  },
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
