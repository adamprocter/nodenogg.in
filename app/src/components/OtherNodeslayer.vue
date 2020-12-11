<template>
  <div ref="othernodes" class="node">
    <div v-if="toolmode == 'move'">
      <div v-for="(value, index) in $options.positionsArray" v-bind:key="index">
        <div v-for="(nodes, index) in othernodes_filtered" v-bind:key="index">
          <draggable
            v-if="nodes.node_id == value.node_id"
            :w="value.width"
            :h="value.height"
            :x="value.x_pos"
            :y="value.y_pos"
            :z="value.z_index"
            :scale="scale"
            @activated="onActivated(nodes.node_id, value.z_index)"
            :draggable="false"
            :resizable="false"
            @dragging="onDrag"
            @resizing="onResize"
            @dragstop="onDragstop"
            @resizestop="onResizestop"
            :style="{
              border: border,
              backgroundColor: nodes.color,
            }"
            :min-width="200"
            :min-height="220"
          >
            <p
              class="read"
              :id="nodes.node_id"
              :inner-html.prop="nodes.node_text | marked"
            ></p>

            <div class="react">
              <div class="eeee">
                <input :value="nodes.node_id" name="id" readonly hidden />
                <input
                  id="emojifield"
                  class="regular-input"
                  v-model="input"
                  readonly
                />

                <emoji-picker @emoji="append" :search="search">
                  <div
                    class="emoji-invoker"
                    slot="emoji-invoker"
                    slot-scope="{ events: { click: clickEvent } }"
                    @click.stop="clickEvent"
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                      />
                    </svg>
                  </div>
                  <div
                    slot="emoji-picker"
                    slot-scope="{ emojis, insert, display }"
                  >
                    <div
                      class="emoji-picker"
                      :style="{ top: display.y + 'px', left: display.x + 'px' }"
                    >
                      <div class="emoji-picker__search">
                        <input type="text" v-model="search" />
                      </div>
                      <div>
                        <div
                          v-for="(emojiGroup, category) in emojis"
                          :key="category"
                        >
                          <h5>{{ category }}</h5>
                          <div class="emojis">
                            <span
                              v-for="(emoji, emojiName) in emojiGroup"
                              :key="emojiName"
                              @click="insert(emoji), sentReact(nodes.node_id)"
                              :title="emojiName"
                              >{{ emoji }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </emoji-picker>
                <div class="allemoji">
                  <div
                    class="eachemoji"
                    v-for="(emojis, index) in configEmoji"
                    :key="index"
                  >
                    <p v-if="nodes.node_id == emojis.node_id">
                      {{ emojis.emoji_text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <!--  IF NOT MOVE tool  -->

    <div v-if="toolmode != 'move'">
      <div v-for="(value, index) in $options.positionsArray" v-bind:key="index">
        <div v-for="(nodes, index) in othernodes_filtered" v-bind:key="index">
          <draggable
            v-if="nodes.node_id == value.node_id"
            :w="value.width"
            :h="value.height"
            :x="value.x_pos"
            :y="value.y_pos"
            :z="value.z_index"
            :scale="scale"
            @activated="onActivated(nodes.node_id, value.z_index)"
            @dragging="onDrag"
            @resizing="onResize"
            @dragstop="onDragstop"
            @resizestop="onResizestop"
            :style="{
              border: border,
              backgroundColor: nodes.color,
            }"
            :min-width="200"
            :min-height="220"
          >
            <p
              class="read"
              :id="nodes.node_id"
              :inner-html.prop="nodes.node_text | marked"
            ></p>

            <div class="react">
              <div class="eeee">
                <input :value="nodes.node_id" name="id" readonly hidden />
                <input
                  id="emojifield"
                  class="regular-input"
                  v-model="input"
                  readonly
                />

                <emoji-picker @emoji="append" :search="search">
                  <div
                    class="emoji-invoker"
                    slot="emoji-invoker"
                    slot-scope="{ events: { click: clickEvent } }"
                    @click.stop="clickEvent"
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                      />
                    </svg>
                  </div>
                  <div
                    slot="emoji-picker"
                    slot-scope="{ emojis, insert, display }"
                  >
                    <div
                      class="emoji-picker"
                      :style="{ top: display.y + 'px', left: display.x + 'px' }"
                    >
                      <div class="emoji-picker__search">
                        <input type="text" v-model="search" />
                      </div>
                      <div>
                        <div
                          v-for="(emojiGroup, category) in emojis"
                          :key="category"
                        >
                          <h5>{{ category }}</h5>
                          <div class="emojis">
                            <span
                              v-for="(emoji, emojiName) in emojiGroup"
                              :key="emojiName"
                              @click="insert(emoji), sentReact(nodes.node_id)"
                              :title="emojiName"
                              >{{ emoji }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </emoji-picker>
                <div class="allemoji">
                  <div
                    class="eachemoji"
                    v-for="(emojis, index) in configEmoji"
                    :key="index"
                  >
                    <p v-if="nodes.node_id == emojis.node_id">
                      {{ emojis.emoji_text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'
import marked from 'marked'
import draggable from '@/experimental/Draggable'

export default {
  name: 'otherNodeslayer',

  components: {
    draggable,
    EmojiPicker,
  },

  data() {
    return {
      border: '2px solid black',
      color: '#CDEAFF',
      input: '',
      search: '',
      pickupz: 1,
      nodeid: String,
      positionsArray: null,
    }
  },

  filters: {
    marked: marked,
  },

  computed: {
    ...mapState({
      scale: (state) => state.ui.scale,
      otherNodes: (state) => state.otherNodes,
      configPositions: (state) => state.configPositions,
      configConnections: (state) => state.configConnections,
      configEmoji: (state) => state.configEmoji,
      toolmode: (state) => state.ui.mode,
    }),

    othernodes_filtered: function () {
      return this.otherNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },

    positions_filtered: function () {
      return this.configPositions.filter((positions) => {
        return this.otherNodes.find((node) => {
          return positions.node_id == node.node_id
        })
      })
    },
  },

  mounted() {
    //access the custom option using $options

    const unwatch = this.$watch('othernodes_filtered', (value) => {
      this.$options.myArray = this.othernodes_filtered
      // this.$options.positionsArray = this.positions_filtered
      this.$forceUpdate()
      // ignore falsy values
      if (!value) return

      // stop watching when nodes_filtered[] is not empty
      if (value && value.length) unwatch()

      // process value here
    })

    const unwatchtwo = this.$watch('positions_filtered', (value) => {
      // this.$options.myArray = this.nodes_filtered
      this.$options.positionsArray = this.positions_filtered
      this.$forceUpdate()
      // ignore falsy values
      if (!value) return

      // stop watching when nodes_filtered[] is not empty
      if (value && value.length) unwatchtwo()

      // process value here
    })
  },

  updated() {
    this.$options.positionsArray = this.positions_filtered
  },

  methods: {
    // loadData() {
    //   this.$options.positionsArray = this.positions_filtered
    //   this.$forceUpdate()
    // },
    onActivated(id, zindex) {
      this.zindex = zindex
      this.nodeid = id
      var i
      var zindexes = []
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        zindexes.push(this.configPositions[i].z_index)
        if (this.configPositions[i].node_id == this.nodeid) {
          this.width = this.configPositions[i].width
          this.height = this.configPositions[i].height
          this.zindex = this.configPositions[i].z_index
        }
      }
      var topZ = Math.max(...zindexes)

      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (topZ > 2147483640) {
          this.configPositions[i].z_index = 0
        }

        if (this.configPositions[i].node_id == this.nodeid) {
          this.width = this.configPositions[i].width
          this.height = this.configPositions[i].height
          this.configPositions[i].z_index = topZ + 1
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
      var zindex
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].node_id == this.nodeid) {
          this.width = this.configPositions[i].width
          this.height = this.configPositions[i].height
          zindex = this.configPositions[i].z_index
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
    onDragstop(x, y, width, height) {
      var localnodeid = this.nodeid
      var zindex
      width = this.width
      height = this.height
      var i
      for (i = 0; i < Object.keys(this.configPositions).length; i++) {
        if (this.configPositions[i].node_id == this.nodeid) {
          this.localx = this.configPositions[i].x_pos
          this.localy = this.configPositions[i].y_pos
          zindex = this.configPositions[i].z_index
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
      this.$options.myArray = this.othernodes_filtered
    },
    append(emoji) {
      this.input += emoji
    },
    sentReact(nodeid, emojitext) {
      emojitext = this.input
      nodeid = this.nodeid
      this.$store.dispatch('addEmoji', {
        nodeid,
        emojitext,
      })

      this.input = ''
    },
  },
  // directives: {
  //   focus: {
  //     inserted(el) {
  //       el.focus()
  //     },
  //   },
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.node {
  background-color: rgb(205, 234, 255);
  position: absolute;
}

.vdr {
  padding: 0 0.5em;
}

input {
  display: none;
}

.allemoji {
  font-size: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, auto));
  /* max-width: 100px; */
  /* float: left; */
}

.eachemoji p {
  margin: 0em;
}

h3 {
  margin-bottom: -30px;
}

.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}

.emoji-invoker {
  top: -0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 2.5rem;
  /* transform: scale(1.6); */
  /* margin: 0em 0em 1em 0em; */
  /* border-radius: 50%; */
  cursor: pointer;
  transition: all 0.8s;
}
.emoji-invoker:hover > svg {
  fill: #84949b;

  /* transform: scale(1.5); */
}
.emoji-invoker > svg {
  fill: #b1c6d0;
  margin-top: 10px;
  margin-left: 0.2em;
  transform: scale(1.5);
}

.emoji-picker {
  transform: scale(1.2);
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 18rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
  margin-top: 3em;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-top: 0;
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: '';
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
