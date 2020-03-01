<template>
  <div ref="othernodes" class="node">
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <vue-draggable-resizable
        v-if="nodeid == value.nodeid"
        :w="value.width"
        :h="value.height"
        :x="value.xpos"
        :y="value.ypos"
        @activated="onActivated"
        @dragging="onDrag"
        @resizing="onResize"
        @dragstop="onDragstop"
        @resizestop="onResizestop"
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

  props: {
    nodeid: String,
    nodetext: String,
    nodewidth: Number,
    nodeheight: Number
  },

  data() {
    return {
      thistext: this.nodetext,
      width: this.nodewidth,
      height: this.nodeheight,
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
    onActivated() {
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].nodeid == this.nodeid) {
          this.width = this.configPositions[i].width
          this.height = this.configPositions[i].height
        }
      }
    },
    onResize(x, y, width, height) {
      this.localx = x
      this.localy = y
      this.width = width
      this.height = height
    },
    onResizestop(x, y, width, height) {
      var localnodeid = this.nodeid
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].nodeid == this.nodeid) {
          this.width = this.configPositions[i].width
          this.height = this.configPositions[i].height
        }
      }
      this.width = width
      this.height = height
      this.$store.dispatch('movePos', { localnodeid, x, y, width, height })
    },
    onDrag(x, y) {
      this.localx = x
      this.localy = y
    },
    onDragstop(x, y, width, height) {
      var localnodeid = this.nodeid
      width = this.width
      height = this.height
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].nodeid == this.nodeid) {
          this.localx = this.configPositions[i].xpos
          this.localy = this.configPositions[i].ypos
        }
      }
      this.$store.dispatch('movePos', { localnodeid, x, y, width, height })
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
