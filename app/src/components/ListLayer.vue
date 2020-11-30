<template>
  <div>
    // FIXME : Future loop does not work yet // future loop Code
    <div v-for="(value, index) in nodes" v-bind:key="index">
      {{ value.node_text }}
    </div>
    // read mode version
    <div v-for="(value, index) in readnodes" v-bind:key="index">
      {{ value.node_text }}
    </div>

    <div v-for="(value, index) in emojis" v-bind:key="index">
      {{ value.emoji_text }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

var readmode
export default {
  name: 'ListLayer',

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

  computed: {
    ...mapState({
      myNodes: (state) => state.myNodes,
      configPositions: (state) => state.configPositions,
      configEmoji: (state) => state.configEmoji,
    }),

    // FIXME: these filters dont work yet
    // ALSO dont forget you did this.$options.myArray = this.myNodes
    // Otherwise your hit the realtimesync issue again
    nodes() {
      return this.nodes.filter((node) => {
        return (
          (node == this.myNodes.node_id) == this.configPositions.node_id &&
          this.myNodes.deleted == false &&
          this.configPositions.read_mode == false
        )
      })
    },

    readnodes() {
      return this.readnodes.filter((readnode) => {
        return (
          (readnode == this.myNodes.node_id) == this.configPositions.node_id &&
          this.myNodes.deleted == false &&
          this.configPositions.read_mode == true
        )
      })
    },

    emojis() {
      return this.emojis.filter((emoji) => {
        return (
          (emoji == this.myNodes.node_id) == this.configPositions.node_id &&
          this.myNodes.deleted == false
        )
      })
    },
  },

  myArray: null,
  created() {
    // SEE ABOVE
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
        this.$store.dispatch('readFlag', { e, readmode })
        this.mode = 'Read'
      } else {
        readmode = true
        this.$store.dispatch('readFlag', { e, readmode })
        this.mode = 'Edit'
      }
    },
  },
  components: {},
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
