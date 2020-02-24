<template>
  <div ref="othernodes" class="node">
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <vue-draggable-resizable
        v-if="nodeid == value.nodeid"
        :w="200"
        :h="250"
        :x="value.xpos"
        :y="value.ypos"
        @dragging="onDrag"
        @resizing="onResize"
        @dragstop="onDragstop"
        style="border: 1px solid black; background-color: rgb(205, 234, 255);"
      >
        <p :id="nodeid" :inner-html.prop="nodetext | marked">{{ nodeid }}</p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

export default {
  name: 'otherNodeslayer',

  props: { nodeid: String, nodetext: String },

  data() {
    return {
      thistext: this.nodetext,
      width: 0,
      height: 0,
      localx: 0,
      localy: 0
    }
  },

  filters: {
    marked: marked
  },

  mounted() {},
  computed: mapState({
    otherNodes: state => state.otherNodes,
    configPositions: state => state.configPositions
  }),
  methods: {
    onResize(x, y, width, height) {
      this.localx = x
      this.localy = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.localx = x
      this.localy = y
    },
    onDragstop(x, y) {
      var localnodeid = this.nodeid

      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].nodeid == this.nodeid) {
          this.localx = this.configPositions[i].xpos
          this.localy = this.configPositions[i].ypos
        }
      }
      this.$store.dispatch('movePos', { localnodeid, x, y })
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
