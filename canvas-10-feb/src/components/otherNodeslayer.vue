<template>
  <div ref="othernodes" class="node">
    <p :id="nodeid">{{ nodetext }}</p>
    <p>markdown supported</p>
  </div>
</template>

<script>
import { drag } from './mixins/drag.js'

export default {
  name: 'otherNodeslayer',
  mixins: [drag],

  props: { nodeid: Number, nodetext: String },

  mounted() {
    var othernodes = this.$refs.othernodes
    this.makeDraggable(othernodes)
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
