<template>
  <div ref="nodes" class="node">
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <div v-if="toolmode == 'move'">
        <vue-draggable-resizable
          class="innernode"
          v-if="nodeid == value.node_id && deleted == false"
          :w="value.width"
          :h="value.height"
          :x="value.x_pos"
          :y="value.y_pos"
          :z="value.z_index"
          :draggable="false"
          :resizable="false"
          style="border: 2px dashed black; background-color: rgb(155, 194, 216)"
          :min-width="200"
          :min-height="220"
        >
          <form>
            <div v-if="value.read_mode == false">
              <div v-for="value in myNodes" v-bind:key="value.node_id">
                <textarea
                  v-if="nodeid == value.node_id"
                  @focus="editTrue(true)"
                  @blur="editTrue(false)"
                  autofocus
                  @input="editNode"
                  :id="nodeid"
                  class="drag-cancel"
                  ref="nodetext"
                  placeholder="Idea goes here! (auto saved every keystroke)"
                ></textarea>
              </div>
            </div>
            <div v-if="value.read_mode == true">
              <p
                class="read"
                :id="nodeid"
                :inner-html.prop="nodetext | marked"
              ></p>
            </div>

            <!-- <h3>Reactions</h3> -->

            <div class="allemoji">
              <div
                class="eachemoji"
                v-for="(emojis, index) in configEmoji"
                :key="index"
              >
                <p v-if="nodeid == emojis.node_id">
                  {{ emojis.emoji_text }}
                </p>
              </div>
            </div>
            <p class="info">*markdown supported &amp; autosaves</p>
            <div class="btn-row">
              <!-- <BaseButton buttonClass="danger" @click="deleteFlag()"
                >Delete</BaseButton
              > -->
              <div v-if="value.read_mode == true">
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Edit Mode
                </BaseButton>
              </div>
              <div v-else>
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Read Mode</BaseButton
                >
              </div>
            </div>
          </form>
        </vue-draggable-resizable>
      </div>

      <!-- Same code as above when in any other mode other than move so you can drag nodes-->

      <div v-else>
        <vue-draggable-resizable
          class="innernode"
          v-if="nodeid == value.node_id && deleted == false"
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
          style="border: 2px dashed black; background-color: rgb(155, 194, 216)"
          :min-width="200"
          :min-height="220"
        >
          <form>
            <div v-if="value.read_mode == false">
              <div v-for="value in myNodes" v-bind:key="value.node_id">
                <div v-if="nodeid == value.node_id">
                  <textarea
                    @focus="editTrue(true)"
                    @blur="editTrue(false)"
                    autofocus
                    @input="editNode"
                    :id="nodeid"
                    class="drag-cancel"
                    ref="nodetext"
                    placeholder="Idea goes here! (auto saved every keystroke)"
                  ></textarea>
                </div>
              </div>
            </div>
            <div v-if="value.read_mode == true">
              <p
                class="read"
                :id="nodeid"
                :inner-html.prop="nodetext | marked"
              ></p>
            </div>

            <!-- <h3>Reactions</h3> -->
            <div class="allemoji">
              <div
                class="eachemoji"
                v-for="(emojis, index) in configEmoji"
                :key="index"
              >
                <p v-if="nodeid == emojis.node_id">
                  {{ emojis.emoji_text }}
                </p>
              </div>
            </div>
            <p class="info">*markdown supported &amp; autosaves</p>
            <div class="btn-row">
              <BaseButton buttonClass="danger" @click="deleteFlag()"
                >Discard</BaseButton
              >
              <div v-if="value.read_mode == true">
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Edit Mode
                </BaseButton>
              </div>
              <div v-else>
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Read Mode</BaseButton
                >
              </div>
            </div>
          </form>
        </vue-draggable-resizable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
//import lodash from 'lodash'
var readmode

export default {
  name: 'NodesLayer',

  props: {
    nodeid: String,
    nodetext: String,
    nodewidth: Number,
    nodeheight: Number,
    deleted: Boolean,
  },

  data() {
    return {
      pickupz: 1,
      localreadmode: false,
      mode: '',
    }
  },

  filters: {
    marked: marked,
  },

  // FIXME: how do we know how to focus on the newest node ?
  // FIXME: Tab between them would also be good
  // var delay = 100
  // var input
  // mounted() {
  //   setTimeout(this.setFocus, delay)
  //   input = this.$refs.nodetext
  //   // console.log(input)
  // },
  // method
  // setFocus() {
  //   this.$refs.nodetext.focus()
  // },

  computed: mapState({
    myNodes: (state) => state.myNodes,
    configPositions: (state) => state.configPositions,
    configConnections: (state) => state.configConnections,
    configEmoji: (state) => state.configEmoji,
    toolmode: (state) => state.ui.mode,
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
        zindex,
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
      // FIXME: What is this for loop doing ??
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
        zindex,
      })

      var j
      for (j = 0; j < Object.keys(this.configConnections).length; j++) {
        if (this.configConnections[j].start_id == this.nodeid) {
          this.$store.dispatch('updateConnect', {
            localnodeid,
            x,
            y,
          })
        }
        if (this.configConnections[j].end_id == this.nodeid) {
          this.$store.dispatch('updateConnectTwo', {
            localnodeid,
            x,
            y,
          })
        }
      }
    },

    editTrue(e) {
      this.$emit('editTrue', e)
      //  // console.log(e)
    },

    // _.debounce(function(e) {
    //             this.input = e.target.value;
    //           }, 300)

    // editNode(e) {
    //   const el = e.target
    //   const cursorPos = el.selectionStart
    //   console.log(cursorPos)
    //   var nodeid = e.target.id
    //   var nodetext = e.target.value
    //   this.$store.dispatch('editNode', { nodeid, nodetext })

    //   this.$nextTick(() => {
    //     e.target.selectionStart = e.target.selectionEnd = cursorPos
    //   })

    // this.$nextTick(() => {
    //   el.setSelectionRange(cursorPos, cursorPos)
    // })
    //},

    // editNode: lodash.debounce(function (e) {
    //   var nodeid = e.target.id
    //   var nodetext = e.target.value
    //   this.$store.dispatch('editNode', { nodeid, nodetext })
    // }, 600),

    // editNode: lodash.debounce(function (e) {
    //   const el = e.target
    //   const cursorPos = el.selectionStart

    //   var nodeid = e.target.id
    //   var nodetext = e.target.value
    //   this.$store.dispatch('editNode', { nodeid, nodetext })

    //   this.$nextTick(() => {
    //     el.setSelectionRange(cursorPos, cursorPos)
    //   })
    // }, 600),

    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    deleteFlag(e) {
      e = this.nodeid
      this.$store.dispatch('deleteFlag', { e })
    },
    readFlag(e) {
      e = this.nodeid

      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].node_id == this.nodeid) {
          this.localreadmode = this.configPositions[i].read_mode
        }
      }

      if (this.localreadmode == true) {
        readmode = false
        this.$store.dispatch('readFlag', { e, readmode })
        this.mode = 'Read'
      } else {
        readmode = true
        this.$store.dispatch('readFlag', { e, readmode })
        this.mode = 'Edit'
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.node {
  position: relative;
}

.vdr {
  padding: 0 0.5em;
}

.info {
  font-size: 0.8em;
  display: inline;
}

textarea {
  width: 100%;
  height: 175px;
  resize: none;
  box-sizing: border-box;
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 1em;
  border: none;
  outline: none;
  background-color: rgb(187, 227, 255);
  scrollbar-color: yellow rgb(187, 227, 255);
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

.allemoji {
  font-size: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, auto));

  /* float: left; */
}

.eachemoji p {
  margin: 0em;
}

img {
  width: 100%;
}
/* .dragging {
  transform: scale(0.7);
} */
</style>
