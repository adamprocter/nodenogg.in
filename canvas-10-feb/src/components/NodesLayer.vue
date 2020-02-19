<template>
  <div ref="nodes" class="node">
    <form>
      <div v-for="value in myNodes" v-bind:key="value.nodeid">
        <textarea
          v-if="nodeid == value.nodeid"
          @input="editNode"
          v-model="value.nodetext"
          :id="nodeid"
        ></textarea>
      </div>

      <p>markdown supported</p>
      <button>delete</button>
    </form>
  </div>
</template>

<script>
import { drag } from './mixins/drag.js'
import { mapState } from 'vuex'

export default {
  name: 'NodesLayer',
  mixins: [drag],
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
  computed: mapState({
    myNodes: state => state.myNodes
  }),
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
  background-color: rgb(207, 177, 235);
  position: absolute;
}
</style>
