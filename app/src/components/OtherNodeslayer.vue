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
        <h3>Reactions</h3>
        <div v-for="(emojis, index) in configEmoji" :key="index">
          <p class="allemoji" v-if="nodeid == emojis.docid">{{ emojis.emojitext }}</p>
        </div>
        <div class="react" v-if="nodeid != undefined">
          <h2>React</h2>
          <div class="eeee">
            <input :value="nodeid" name="id" readonly hidden />
            <input id="emojifield" class="regular-input" v-model="input" readonly />

            <emoji-picker @emoji="append" :search="search">
              <div
                class="emoji-invoker"
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
              >
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                  />
                </svg>
              </div>
              <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                <div
                  class="emoji-picker"
                  :style="{ top: display.y + 'px', left: display.x + 'px' }"
                >
                  <div class="emoji-picker__search">
                    <input type="text" v-model="search" v-focus />
                  </div>
                  <div>
                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                      <h5>{{ category }}</h5>
                      <div class="emojis">
                        <span
                          v-for="(emoji, emojiName) in emojiGroup"
                          :key="emojiName"
                          @click="insert(emoji)"
                          :title="emojiName"
                        >{{ emoji }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </emoji-picker>
            <button @click="sentReact()">Send Reaction</button>
          </div>
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'
import marked from 'marked'

export default {
  name: 'otherNodeslayer',

  components: {
    EmojiPicker
  },
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
      input: '',
      search: ''
    }
  },

  filters: {
    marked: marked
  },

  mounted() {},
  computed: mapState({
    otherNodes: state => state.otherNodes,
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
    append(emoji) {
      this.input += emoji
    },
    sentReact(docid, emojitext) {
      emojitext = this.input
      docid = this.nodeid
      this.$store.dispatch('addEmoji', {
        docid,
        emojitext
      })

      this.input = ''
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
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

.emoji-invoker {
  top: -0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 1em;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
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
