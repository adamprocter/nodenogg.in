<template>
  <div>
    <div v-for="(value, index) in nodes_filtered" v-bind:key="index">
      <form class="nodes">
        <textarea
          @focus="editTrue(true)"
          @blur="editTrue(false)"
          autofocus
          v-model="value.node_text"
          @input="editNode"
          :id="value.node_id"
          placeholder="Type your thoughts and ideas here! (auto saved every keystroke)"
        ></textarea>
        <p class="info">*markdown supported &amp; autosaves</p>

        <div class="btn-row">
          <SvgButton
            buttonClass="nodes"
            @click.prevent="deleteFlag(value.node_id)"
          />
          <SvgButton2 buttonClass="nodes" @click.prevent="readFlag()" />
        </div>

        <div class="allemoji">
          <div
            class="eachemoji"
            v-for="(emojis, index) in emojis_filtered"
            :key="index"
          >
            <!-- shorthand is v-if here... but we want to filter -->
            <!-- {{ emojis.emoji_id }} -->
            {{ emojis.emoji_text }}
          </div>
        </div>
      </form>
    </div>
    <!-- <div v-for="(value, index) in nodes_filtered" v-bind:key="index">
      {{ value.node_text }}
    </div> -->

    <!-- <div v-for="(value, index) in readnodes_filtered" v-bind:key="index">
      {{ value.node_text }}
    </div> -->

    <!-- <div v-for="(value, index) in readnodes" v-bind:key="index">
      {{ value.node_text }}
    </div>

    <div v-for="(value, index) in emojis" v-bind:key="index">
      {{ value.emoji_text }}
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import SvgButton from '@/components/SvgButton'
import SvgButton2 from '@/components/SvgButton2'

var readmode
export default {
  name: 'ListLayer',

  data: function () {
    return {
      localreadmode: false,
    }
  },

  props: {
    // nodeid: String,
    // nodetext: String,
    // deleted: Boolean,
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

    emojis_filtered() {
      return this.configEmoji.filter((emojis) => {
        console.log(emojis.nodeid)
        // if emojis.nodeid == myNodes.node_id
        return emojis
      })
    },

    // emojis_filtered() {
    //   return this.configEmoji.filter((emojis) => {
    //     return (
    //       (emojis == this.myNodes.node_id) == this.configPositions.node_id &&
    //       this.myNodes.deleted == false
    //     )
    //   })
    // },

    /// THIS IS UNFINSHED

    readnodes_filtered: function () {
      // this read mode = true
      // but readmode is on config positions
      return this.myNodes.filter((u) => u.readmode)
    },

    nodes() {
      return this.myNodes.filter((node) => {
        return node
        // (node == this.myNodes.node_id) == this.configPositions.node_id &&
        // this.myNodes.deleted == false &&
        // this.configPositions.read_mode == false
      })
    },

    readnodes() {
      return this.myNodes.filter((readnode) => {
        return (
          (readnode == this.myNodes.node_id) == this.configPositions.node_id &&
          this.myNodes.deleted == false &&
          this.configPositions.read_mode == true
        )
      })
    },
  },

  myArray: null,
  created() {
    //FIXME : now needs to use filter See Above
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
      //e = this.nodeid
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
        this.$store.dispatch('readFlag', { e, readmode })
        this.mode = 'Read'
      } else {
        readmode = true
        this.$store.dispatch('readFlag', { e, readmode })
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
.nodes {
  width: 95%;
  border: 2px dashed black;
  background-color: rgb(155, 194, 216);
  margin-top: 1em;
  margin-left: 0.5em;
}

.readmode {
  margin-top: 1em;
  margin-left: 1em;
}

textarea {
  width: 100%;
  height: 175px;
  resize: none;
  box-sizing: border-box;
  font-size: 18px;
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
