<template>
  <div ref="othernodes" class="othernodes">
    <form>
      <p :id="nodeid">{{ nodetext }}</p>
      <p>markdown supported</p>
    </form>
  </div>
</template>

<script>
import { drag } from './mixins/drag.js'
// import { mapState } from 'vuex'

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
.othernodes {
  background-color: aquamarine;
  /* position: absolute; */
}
</style>
