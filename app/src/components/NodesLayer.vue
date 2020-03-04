<template>
  <div ref="nodes" class="node">
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <vue-draggable-resizable
        class="innernode"
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
        :drag-cancel="'.drag-cancel'"
        style="background-color: rgb(205, 234, 255)"
      >
        <form>
          <div v-for="value in myNodes" v-bind:key="value.nodeid">
            <textarea
              v-if="nodeid == value.nodeid"
              @input="editNode"
              v-model="value.nodetext"
              :id="nodeid"
              class="drag-cancel"
            ></textarea>
          </div>
          <h3>Reactions</h3>
          <div v-for="(emojis, index) in configEmoji" :key="index">
            <p class="allemoji" v-if="nodeid == emojis.docid">{{ emojis.emojitext }}</p>
          </div>
          <!-- <div v-for="(value, index) in configPositions" v-bind:key="index">
          <p v-if="nodeid == value.nodeid">
            {{ localx }}, ({{ value.xpos }}) {{ localy }}
          </p>
          </div>-->

          <p>markdown supported</p>
          <button class="danger" @click="deleteFlag()">Delete</button>
        </form>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NodesLayer',

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
      localy: 0,
      globalscale: 0.7
    }
  },

  mounted() {
    //
  },
  computed: mapState({
    myNodes: state => state.myNodes,
    configPositions: state => state.configPositions,
    configEmoji: state => state.configEmoji
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
    },

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
  position: relative;
}

img {
  width: 100%;
}
/* .draggable {
  transform: scale(0.7);
} */

textarea {
  width: 100%;
  height: 120px;
  resize: none;
  box-sizing: border-box;
}
</style>
