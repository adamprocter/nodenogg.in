<template>
  <div ref="nodes" class="node">
    <div v-for="(posvalue, index) in configPositions" v-bind:key="index">
      <div v-if="toolmode == 'move'">
        <vue-draggable-resizable
          class="innernode"
          v-if="nodeid == posvalue.node_id"
          :w="posvalue.width"
          :h="posvalue.height"
          :x="posvalue.x_pos"
          :y="posvalue.y_pos"
          :z="posvalue.z_index"
          :draggable="false"
          style="background-color: rgb(205, 234, 255);"
        >
          <form>
            <div v-if="posvalue.read_mode == false">
              <div v-for="value in myNodes" v-bind:key="value.node_id">
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
            <div v-if="posvalue.read_mode == true">
              <p
                class="read"
                :id="nodeid"
                :inner-html.prop="nodetext | marked"
              ></p>
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
              <div v-if="posvalue.read_mode == true">
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Edit
                </BaseButton>
              </div>
              <div v-else>
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Read</BaseButton
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
          v-if="nodeid == posvalue.node_id"
          :w="posvalue.width"
          :h="posvalue.height"
          :x="posvalue.x_pos"
          :y="posvalue.y_pos"
          :z="posvalue.z_index"
          @activated="onActivated"
          @dragging="onDrag"
          @resizing="onResize"
          @dragstop="onDragstop"
          @resizestop="onResizestop"
          :drag-cancel="'.drag-cancel'"
          style="background-color: rgb(205, 234, 255);"
        >
          <form>
            <div v-if="posvalue.read_mode == false">
              <div v-for="value in myNodes" v-bind:key="value.node_id">
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
            <div v-if="posvalue.read_mode == true">
              <p
                class="read"
                :id="nodeid"
                :inner-html.prop="nodetext | marked"
              ></p>
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
              <div v-if="posvalue.read_mode == true">
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Edit
                </BaseButton>
              </div>
              <div v-else>
                <BaseButton
                  class="read"
                  buttonClass="action"
                  @click="readFlag()"
                  >Read</BaseButton
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
import lodash from 'lodash'
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
      pickupz: 99,
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
    },

    editTrue(e) {
      this.$emit('editTrue', e)
      //  // console.log(e)
    },

    // _.debounce(function(e) {
    //             this.input = e.target.value;
    //           }, 300)

    editNode: lodash.debounce(function (e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    }, 600),

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

.allemoji {
  font-size: 2em;
}

img {
  width: 100%;
}
/* .draggable {
  transform: scale(0.7);
} */
</style>
