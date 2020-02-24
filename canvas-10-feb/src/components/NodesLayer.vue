<template>
  <div ref="nodes" class="node">
    <vue-draggable-resizable
      :w="200"
      :h="200"
      @dragging="onDrag"
      @resizing="onResize"
      style="background-color: rgb(205, 234, 255);"
    >
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
    </vue-draggable-resizable>
  </div>
</template>

<script>
//import { drag } from './mixins/drag.js'
import { mapState } from 'vuex'

export default {
  name: 'NodesLayer',
  // mixins: [drag],
  props: { nodeid: String, nodetext: String },

  data() {
    return {
      thistext: this.nodetext,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },

  mounted() {
    //  var nodes = this.$refs.nodes
    //   this.makeDraggable(nodes)
  },
  computed: mapState({
    myNodes: state => state.myNodes
  }),
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
    },
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
  position: relative;
}

textarea {
  width: 195px;
  height: 120px;
  resize: none;
}
</style>
