<template>
  <div ref="nodes" class="node">
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
          <!-- <div v-for="(value, index) in configPositions" v-bind:key="index">
          <p v-if="nodeid == value.nodeid">
            {{ localx }}, ({{ value.xpos }}) {{ localy }}
          </p>
        </div> -->

          <p>markdown supported</p>
          <button class="danger" @click="deleteFlag()">
            Delete
          </button>
        </form>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NodesLayer',

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

  mounted() {
    //
  },
  computed: mapState({
    myNodes: state => state.myNodes,
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
  background-color: rgb(207, 177, 235);
  position: relative;
}

textarea {
  width: 195px;
  height: 120px;
  resize: none;
}
</style>
