<template>
  <div ref="nodes" class="node">
    <div v-if="toolmode == 'move'">
      <div v-for="(value, index) in $options.positionsArray" v-bind:key="index">
        <div v-for="(nodes, index) in $options.myArray" v-bind:key="index">
          <draggable
            class="innernode"
            v-if="nodes.node_id == value.node_id"
            :w="value.width"
            :h="value.height"
            :x="value.x_pos"
            :y="value.y_pos"
            :z="value.z_index"
            :scale="scale"
            @activated="onActivated(nodes.node_id)"
            :draggable="false"
            :resizable="false"
            @dragging="onDrag"
            @resizing="onResize"
            @dragstop="onDragstop"
            @resizestop="onResizestop"
            :drag-cancel="'.drag-cancel'"
            style="
              border: 2px dashed black;
              background-color: rgb(155, 194, 216);
            "
            :min-width="200"
            :min-height="220"
          >
            <form class="nodes">
              <template v-if="nodes.read_mode == false">
                <textarea
                  @focus="editTrue(true)"
                  @blur="editTrue(false)"
                  autofocus
                  v-model="nodes.node_text"
                  @input="editNode"
                  :id="nodes.node_id"
                  placeholder="Type your thoughts and ideas here! (auto saved every keystroke)"
                ></textarea>
                <p class="info">*markdown supported &amp; autosaves</p>
              </template>
              <template v-else>
                <p
                  :id="nodes.node_id"
                  :inner-html.prop="nodes.node_text | marked"
                ></p>
              </template>
              <template v-if="toolmode == 'select'">
                <div class="btn-row">
                  <SvgButton
                    buttonClass="nodes"
                    @click.prevent="deleteFlag(nodes.node_id)"
                  />
                  <SvgButton2
                    buttonClass="nodes"
                    @click.prevent="readFlag(nodes.node_id, nodes.read_mode)"
                  />
                </div>
              </template>

              <div class="allemoji">
                <div
                  class="eachemoji"
                  v-for="(emojis, index) in configEmoji"
                  :key="index"
                >
                  <template v-if="emojis.node_id == nodes.node_id">{{
                    emojis.emoji_text
                  }}</template>
                </div>
              </div>
            </form>
          </draggable>
        </div>
      </div>
    </div>

    <!-- IF NOT MOVE -->

    <div v-if="toolmode != 'move'">
      <div v-for="(value, index) in $options.positionsArray" v-bind:key="index">
        <div v-for="(nodes, index) in $options.myArray" v-bind:key="index">
          <draggable
            class="innernode"
            v-if="nodes.node_id == value.node_id"
            :w="value.width"
            :h="value.height"
            :x="value.x_pos"
            :y="value.y_pos"
            :z="value.z_index"
            :scale="scale"
            @activated="onActivated(nodes.node_id)"
            @dragging="onDrag"
            @resizing="onResize"
            @dragstop="onDragstop"
            @resizestop="onResizestop"
            :drag-cancel="'.drag-cancel'"
            style="
              border: 2px dashed black;
              background-color: rgb(155, 194, 216);
            "
            :min-width="200"
            :min-height="220"
          >
            <form class="nodes">
              <template v-if="nodes.read_mode == false">
                <textarea
                  @focus="editTrue(true)"
                  @blur="editTrue(false)"
                  autofocus
                  v-model="nodes.node_text"
                  @input="editNode"
                  :id="nodes.node_id"
                  placeholder="Type your thoughts and ideas here! (auto saved every keystroke)"
                ></textarea>
                <p class="info">*markdown supported &amp; autosaves</p>
              </template>
              <template v-else>
                <p
                  :id="nodes.node_id"
                  :inner-html.prop="nodes.node_text | marked"
                ></p>
              </template>
              <template v-if="toolmode == 'select'">
                <div class="btn-row">
                  <SvgButton
                    buttonClass="nodes"
                    @click.prevent="deleteFlag(nodes.node_id)"
                  />
                  <SvgButton2
                    buttonClass="nodes"
                    @click.prevent="readFlag(nodes.node_id, nodes.read_mode)"
                  />
                </div>
              </template>

              <div class="allemoji">
                <div
                  class="eachemoji"
                  v-for="(emojis, index) in configEmoji"
                  :key="index"
                >
                  <template v-if="emojis.node_id == nodes.node_id">{{
                    emojis.emoji_text
                  }}</template>
                </div>
              </div>
            </form>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import SvgButton from '@/components/SvgButton'
import SvgButton2 from '@/components/SvgButton2'
import draggable from '@/experimental/Draggable'

var readmode

export default {
  name: 'NodesLayer',

  data() {
    return {
      pickupz: 1,
      localreadmode: false,
      mode: '',
      nodeid: String,
      myArray: null,
      positionsArray: null,
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

  computed: {
    ...mapState({
      scale: (state) => state.ui.scale,
      myNodes: (state) => state.myNodes,
      configPositions: (state) => state.configPositions,
      configConnections: (state) => state.configConnections,
      configEmoji: (state) => state.configEmoji,
      toolmode: (state) => state.ui.mode,
    }),

    nodes_filtered: function () {
      return this.myNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },
    // this is not working correctly as dragging around moves wrong things
    positions_filtered: function () {
      return this.configPositions.filter((positions) => {
        return this.myNodes.some((node) => {
          return positions.node_id == node.node_id
        })
      })
    },
  },
  // this is to stop sync chasing bug

  created() {
    //access the custom option using $options
    setTimeout(this.loadData, 2000)
    this.$options.myArray = this.nodes_filtered
    this.$options.positionsArray = this.positions_filtered
  },

  updated() {
    this.$options.positionsArray = this.positions_filtered
   
    if (this.toolmode == 'addNode') {
      setTimeout(this.loadData, 300)
      // this.$options.myArray = this.nodes_filtered
      this.$store.commit('ui/setMode', 'select')
    }
  },

  methods: {
    loadData() {
      this.$options.myArray = this.nodes_filtered
      this.$options.positionsArray = this.positions_filtered
      this.$forceUpdate()
    },
    onActivated(e) {
      this.nodeid = e
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
      this.$emit('edit-true', e)
    },

    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    deleteFlag(e) {
      if (confirm('Confirm discard?')) {
        this.$store.dispatch('deleteFlag', { e })
        this.$options.myArray = this.nodes_filtered
      } else {
        // nothing happens
      }
    },

    readFlag(e, f) {
      readmode = f
      readmode = !readmode
      this.$store.dispatch('readFlag', { e, readmode })
      this.$options.myArray = this.nodes_filtered
      if (readmode == true) {
        this.mode = 'Read'
      } else {
        this.mode = 'Edit'
      }
    },
  },
  components: {
    draggable,
    SvgButton,
    SvgButton2,
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
  font-size: 18px;
  box-sizing: border-box;
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0.5em;
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

li {
  font-size: 6em;
}
/* .dragging {
  transform: scale(0.7);
} */
</style>
