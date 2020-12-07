<template>
  <div class="grid">
    <div v-for="(nodes, index) in nodes_filtered" v-bind:key="index">
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
            @click.prevent="deleteFlag(nodes.node_id)"
          />
          <SvgButton2
            buttonClass="nodes"
            @click.prevent="readFlag(nodes.node_id, nodes.read_mode)"
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

  filters: {
    marked: marked,
  },
  computed: {
    ...mapState({
      myNodes: (state) => state.myNodes,
      configPositions: (state) => state.configPositions,
      configEmoji: (state) => state.configEmoji,
    }),

    nodes_filtered: function () {
      return this.myNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },
  },

  // this is to stop sync chasing bug
  myArray: null,
  mounted() {
    //access the custom option using $options
    this.$options.myArray = this.nodes_filtered
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

@media only screen and (max-width: 600px) {
  .readmode >>> a {
    font-size: 2em;
    word-break: break-all;
    padding-right: 0.5em;
  }
}
</style>
