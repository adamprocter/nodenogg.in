<template>
  <div ref="othernodes" class="node">
    <vue-draggable-resizable
      :w="200"
      :h="200"
      @dragging="onDrag"
      @resizing="onResize"
      style="border: 1px solid black; background-color: rgb(205, 234, 255);"
    >
      <p :id="nodeid">{{ nodetext }}</p>
      <p>markdown supported</p>
    </vue-draggable-resizable>
  </div>
</template>

<script>
//import { drag } from './mixins/drag.js'

export default {
  name: 'otherNodeslayer',
  //mixins: [drag],

  props: { nodeid: String, nodetext: String },

  data: function() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },

  mounted() {
    //  var othernodes = this.$refs.othernodes
    // this.makeDraggable(othernodes)
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function(x, y) {
      this.x = x
      this.y = y
    }
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
