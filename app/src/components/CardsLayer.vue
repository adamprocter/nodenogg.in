<template>
  <draggable @start="drag = true" @end="drag = false">
    <div v-for="(nodes, index) in $options.myArray" v-bind:key="index">
      <form class="nodes">
        <template v-if="nodes.read_mode == false">
          <textarea
            @focus="editTrue(true)"
            @blur="editTrue(false)"
            autofocus
            v-model="nodes.node_text"
            @input="editNode"
            :id="nodes.node_id"
            ref="nodetext"
            placeholder="Type your thoughts and ideas here! (auto saved every keystroke)"
          ></textarea>
        </template>
        <template v-else>
          <p
            :id="nodes.node_id"
            :inner-html.prop="nodes.node_text | marked"
          ></p>
        </template>
        <div class="btn-row">
          <SvgButton
            buttonClass="nodes"
            @click.prevent="deleteFlag(nodes.node_id), updateNodes()"
          />
          <SvgButton2
            buttonClass="nodes"
            @click.prevent="
              readFlag(nodes.node_id, nodes.read_mode), updateNodes()
            "
          />
        </div>

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
    </div>

    <div
      v-for="(othernodes, index) in othernodes_filtered"
      v-bind:key="index.nodeid"
    >
      <div class="nodes">
        <p :inner-html.prop="othernodes.node_text | marked"></p>

        <div class="eeee">
          <input :value="othernodes.node_id" name="id" readonly hidden />
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
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div
                class="emoji-picker"
                :style="{ top: display.y + 'px', left: display.x + 'px' }"
              >
                <div class="emoji-picker__search">
                  <input type="text" v-model="search" />
                </div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji), sentReact(othernodes.node_id)"
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
              <p v-if="othernodes.node_id == emojis.node_id">
                {{ emojis.emoji_text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </draggable>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import draggable from 'vuedraggable'
import EmojiPicker from 'vue-emoji-picker'
import SvgButton from '@/components/SvgButton'
import SvgButton2 from '@/components/SvgButton2'
var readmode
var nodeid
var emojitext

export default {
  name: 'CardsLayer',

  props: {
    added: Boolean,
  },
  data: function () {
    return {
      localreadmode: false,
      myArray: null,
      update: false,
      input: '',
      search: '',
    }
  },

  filters: {
    marked: marked,
  },
  computed: {
    ...mapState({
      otherNodes: (state) => state.otherNodes,
      myNodes: (state) => state.myNodes,
      configPositions: (state) => state.configPositions,
      configEmoji: (state) => state.configEmoji,
    }),

    nodes_filtered: function () {
      return this.myNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },
    othernodes_filtered: function () {
      return this.otherNodes.filter((othernodes) => {
        return othernodes.deleted == false
      })
    },
  },

  // this is to stop sync chasing bug

  mounted() {
    //access the custom option using $options
    const unwatch = this.$watch('nodes_filtered', (value) => {
      this.$options.myArray = this.nodes_filtered

      this.$forceUpdate()
      // ignore falsy values
      if (!value) return

      // stop watching when nodes_filtered[] is not empty
      if (value && value.length) unwatch()

      // process value here
    })
  },

  watch: {
    added: {
      deep: true,

      handler() {
        setTimeout(this.loadData, 200)
      },
    },
    update: {
      deep: true,

      handler() {
        setTimeout(this.loadData, 200)
      },
    },
  },

  methods: {
    append(emoji) {
      this.input += emoji
    },
    sentReact(e) {
      emojitext = this.input
      nodeid = e

      this.$store.dispatch('addEmoji', {
        nodeid,
        emojitext,
      })

      this.input = ''
    },
    updateNodes() {
      this.update = !this.update
    },
    loadData() {
      this.$options.myArray = this.nodes_filtered

      this.$forceUpdate()
    },
    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    editTrue(e) {
      this.$emit('edit-true', e)
    },

    deleteFlag(e) {
      if (confirm('Confirm discard?')) {
        this.$store.dispatch('deleteFlag', { e })
      } else {
        // nothing happens
      }
    },
    readFlag(e, f) {
      readmode = f
      readmode = !readmode
      this.$store.dispatch('readFlag', { e, readmode })

      if (readmode == true) {
        this.mode = 'Read'
      } else {
        this.mode = 'Edit'
      }
    },
  },
  components: {
    SvgButton,
    SvgButton2,
    EmojiPicker,
    draggable,
  },
}
</script>

<style lang="css" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
}
.nodes {
  min-width: 343px;
  max-width: 343px;
  border: 2px dashed black;
  background-color: rgb(155, 194, 216);
  margin-top: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.readmode {
  margin-top: 1em;
  margin-left: 1em;
  padding-right: 1em;
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

input {
  display: none;
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

@media only screen and (max-width: 600px) {
  .readmode >>> a {
    font-size: 2em;
    word-break: break-all;
    padding-right: 0.5em;
  }
}
</style>
