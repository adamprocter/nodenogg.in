<template>
  <div ref="nodes" class="node">
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <vue-draggable-resizable
        class="innernode"
        v-if="nodeid == value.node_id"
        :w="value.width"
        :h="value.height"
        :x="value.x_pos"
        :y="value.y_pos"
        :z="value.z_index"
        @activated="onActivated"
        @dragging="onDrag"
        @resizing="onResize"
        @dragstop="onDragstop"
        @resizestop="onResizestop"
        :drag-cancel="'.drag-cancel'"
        style="background-color: rgb(205, 234, 255);"
      >
        <form>
          <div v-if="readmode == false">
            <div v-for="value in myNodes" v-bind:key="value.node_id">
              <!-- <div v-if="readmode == false"> -->
              <textarea
                v-if="nodeid == value.node_id"
                @focus="editTrue(true)"
                @blur="editTrue(false)"
                autofocus
                @input="editNode"
                v-model="value.node_text"
                :id="nodeid"
                class="drag-cancel"
                ref="nodetext"
                placeholder="Idea goes here!"
              ></textarea>
            </div>
          </div>
          <!-- FIXME: What is this doing below now ? Looks old -->
          <div v-else>
            <p :id="nodeid" :inner-html.prop="nodetext | marked">
              {{ nodeid }}
            </p>
          </div>

          <h3>Reactions</h3>
          <div v-for="(emojis, index) in configEmoji" :key="index">
            <p class="allemoji" v-if="nodeid == emojis.node_id">
              {{ emojis.emoji_text }}
            </p>
          </div>

          <p class="info">*markdown supported</p>
          <div class="btn-row">
            <BaseButton buttonClass="danger" @click="deleteFlag()"
              >Delete</BaseButton
            >
            <BaseButton class="read" buttonClass="action" @click="readFlag()">{{
              mode
            }}</BaseButton>
          </div>
        </form>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

export default {
  name: 'NodesLayer',

  props: {
    nodeid: String,
    nodetext: String,
    nodewidth: Number,
    nodeheight: Number,
    deleted: Boolean
  },

  data() {
    return {
      pickupz: 99,
      readmode: false,
      mode: 'Read'
    }
  },

  filters: {
    marked: marked
  },

  // FIXME: how do we know how to focus on the newest node ?
  // FIXME: Tab between them would also be good
  // var delay = 100
  // var input
  // mounted() {
  //   setTimeout(this.setFocus, delay)
  //   input = this.$refs.nodetext
  //   console.log(input)
  // },
  // method
  // setFocus() {
  //   this.$refs.nodetext.focus()
  // },

  computed: mapState({
    myNodes: state => state.myNodes,
    configPositions: state => state.configPositions,
    configEmoji: state => state.configEmoji
  }),
  methods: {
    onActivated() {
      var i

      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].node_id == this.nodeid) {
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
    onResizestop(x, y, width, height, zindex) {
      var localnodeid = this.nodeid
      zindex = this.pickupz
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].node_id == this.nodeid) {
          this.width = this.configPositions[i].width
          this.height = this.configPositions[i].height
          this.pickupz = this.configPositions[i].z_index
        }
      }
      this.width = width
      this.height = height
      this.$store.dispatch('movePos', {
        localnodeid,
        x,
        y,
        width,
        height,
        zindex
      })
    },
    onDrag(x, y) {
      this.localx = x
      this.localy = y
    },
    onDragstop(x, y, width, height, zindex) {
      var localnodeid = this.nodeid
      zindex = this.pickupz
      width = this.width
      height = this.height
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].node_id == this.nodeid) {
          this.localx = this.configPositions[i].x_pos
          this.localy = this.configPositions[i].y_pos
          this.pickupz = this.configPositions[i].z_index
        }
      }
      this.$store.dispatch('movePos', {
        localnodeid,
        x,
        y,
        width,
        height,
        zindex
      })
    },

    editTrue(e) {
      this.$emit('editTrue', e)
      //  console.log(e)
    },

    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },
    deleteFlag(e) {
      e = this.nodeid
      this.$store.dispatch('deleteFlag', { e })
    },
    readFlag() {
      if (this.readmode == true) {
        this.readmode = false
        this.mode = 'Read'
      } else {
        this.readmode = true
        this.mode = 'Edit'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.node {
  position: relative;
}

.info {
  font-size: 0.8em;
}

textarea {
  width: 100%;
  height: 125px;
  resize: none;
  box-sizing: border-box;
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  outline: #cab6ff;
}

.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}

img {
  width: 100%;
}
/* .draggable {
  transform: scale(0.7);
} */
</style>
