<template>
  <div>
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <div class="nodes" v-if="nodeid == value.node_id && deleted == false">
        <form>
          <div v-for="value in $options.myArray" v-bind:key="value.node_id">
            <div v-if="nodeid == value.node_id && deleted == false">
              <p
                class="read"
                :id="nodeid"
                :inner-html.prop="nodetext | marked"
              ></p>
              <!-- <h3>Reactions</h3> -->

              <div class="react" v-if="value.node_id != undefined">
                <!-- <h2>React</h2> -->
                <div class="eeee">
                  <input :value="value.node_id" name="id" readonly hidden />
                  <input
                    id="emojifield"
                    class="regular-input"
                    v-model="input"
                    readonly
                  />
                  <div class="allemoji">
                    <div
                      class="eachemoji"
                      v-for="(emojis, index) in configEmoji"
                      :key="index"
                    >
                      <p v-if="value.node_id == emojis.node_id">
                        {{ emojis.emoji_text }}
                      </p>
                    </div>
                  </div>
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
                        :style="{
                          top: display.y + 'px',
                          left: display.x + 'px',
                        }"
                      >
                        <div class="emoji-picker__search">
                          <input type="text" v-model="search" v-focus />
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
                                @click="insert(emoji), sentReact()"
                                :title="emojiName"
                                >{{ emoji }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </emoji-picker>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'
import marked from 'marked'

export default {
  name: 'OtherCardslayer',

  components: {
    EmojiPicker,
  },
  data() {
    return {
      input: '',
      search: '',
    }
  },

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  filters: {
    marked: marked,
  },

  computed: mapState({
    otherNodes: (state) => state.otherNodes,
    configPositions: (state) => state.configPositions,
    configEmoji: (state) => state.configEmoji,
  }),

  myArray: null,
  created() {
    this.$options.myArray = this.otherNodes
  },

  methods: {
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
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
}
</script>

<style lang="css" scoped>
h2 {
  color: red;
}

.allemoji {
  font-size: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, auto));
}

.eachemoji p {
  margin: 0em;
}
.nodes {
  width: 285px;
  border: 2px solid black;
  background-color: rgb(205, 234, 255);
  margin-top: 1em;
  margin-right: 1em;
  padding-left: 1em;
  padding-bottom: 1em;
}

input {
  display: none;
}

.emoji-invoker {
  cursor: pointer;
  transition: all 0.8s;
}
.emoji-invoker:hover > svg {
  fill: #000000;
}
.emoji-invoker > svg {
  fill: #767b7e;
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
  margin-left: 3em;
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
