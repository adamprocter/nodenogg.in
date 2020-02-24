<template>
  <div ref="nodes" class="node">
    <vue-draggable-resizable
      :w="200"
      :h="250"
      @dragging="onDrag"
      @resizing="onResize"
      @dragstop="onDragstop"
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
        <div v-for="(value, index) in configPositions" v-bind:key="index">
          <p v-if="nodeid == value.nodeid">{{ x }}, {{ y }}</p>
        </div>
        <p>markdown supported</p>
        <button class="danger" @click="deleteFlag()">
          Delete
        </button>
      </form>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NodesLayer',

  props: { nodeid: String, nodetext: String, xpos: Number, ypos: Number },

  data() {
    return {
      thistext: this.nodetext,
      width: 0,
      height: 0,
      x: this.xpos,
      y: this.ypos
    }
  },

  mounted() {
    //  var nodes = this.$refs.nodes
    //   this.makeDraggable(nodes)
  },
  computed: mapState({
    myNodes: state => state.myNodes,
    configPositions: state => state.configPositions
  }),
  methods: {
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
    onDragstop(x, y) {
      var localnodeid = this.nodeid
      // console.log(x)
      // console.log(y)
      // console.log(localnodeid)
      this.$store.dispatch('movePos', { localnodeid, x, y })
    },
    // end DRAG update the right positions in DB
    //   this.$store.dispatch('movePos', {this.nodeid, this.x, this.y})

    setFocus() {
      // this.$refs.nodetext.focus()
    },
    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },
    deleteFlag(e) {
      e = this.nodeid
      this.$store.dispatch('deleteFlag', { e })
    }
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
