<template>
  <div>
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <div class="nodes" v-if="nodeid == value.node_id && deleted == false">
        <form>
          <div v-if="value.read_mode == false">
            <div v-for="value in $options.myArray" v-bind:key="value.node_id">
              <textarea
                v-if="nodeid == value.node_id"
                @focus="editTrue(true)"
                @blur="editTrue(false)"
                autofocus
                v-model="value.node_text"
                @input="editNode"
                :id="nodeid"
                ref="nodetext"
                placeholder="Type your thoughts and ideas here! (auto saved every keystroke)"
              ></textarea>
            </div>
            <p class="info">*markdown supported &amp; autosaves</p>
          </div>
          <div class="readmode" v-if="value.read_mode && deleted == false">
            <p :id="nodeid" :inner-html.prop="nodetext | marked"></p>
          </div>
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

          <div class="btn-row">
            <SvgButton buttonClass="nodes" @click.prevent="deleteFlag()" />
            <div v-if="value.read_mode == true && deleted == false">
              <SvgButton2 buttonClass="nodes" @click.prevent="readFlag()" />

              <!-- <BaseButton class="read" buttonClass="action" @click="readFlag()"
                >Edit Mode
              </BaseButton> -->
            </div>
            <div v-else>
              <SvgButton2 buttonClass="nodes" @click.prevent="readFlag()" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import SvgButton from '@/components/SvgButton'
import SvgButton2 from '@/components/SvgButton2'
var readmode

export default {
  name: 'CardsLayer',

  data: function () {
    return {
      localreadmode: false,
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
    myNodes: (state) => state.myNodes,
    configPositions: (state) => state.configPositions,
    configEmoji: (state) => state.configEmoji,
  }),

  myArray: null,
  created() {
    this.$options.myArray = this.myNodes
    this.readFlag
  },

  methods: {
    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    editTrue(e) {
      this.$emit('edit-true', e)
    },

    deleteFlag(e) {
      e = this.nodeid
      if (confirm('Confirm discard?')) {
        this.$store.dispatch('deleteFlag', { e })
      } else {
        // nothing happens
      }
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
        this.$store.dispatch('legacyreadFlag', { e, readmode })
        this.mode = 'Read'
      } else {
        readmode = true
        this.$store.dispatch('legacyreadFlag', { e, readmode })
        this.mode = 'Edit'
      }
    },
    // setFocus() {
    //   this.$refs.nodetext.focus()
    // },
  },
  components: {
    SvgButton,
    SvgButton2,
  },
}
</script>

<style lang="css" scoped>
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

@media only screen and (max-width: 600px) {
  .readmode >>> a {
    font-size: 2em;
    word-break: break-all;
    padding-right: 0.5em;
  }
}
</style>
