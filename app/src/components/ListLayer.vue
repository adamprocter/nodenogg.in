<template>
  <div>
    <div v-for="(nodes, index) in $options.myArray" v-bind:key="index">
      <form
        class="nodes"
        :style="{
          backgroundColor: nodes.color,
        }"
      >
        <template v-if="nodes.read_mode == false">
          <textarea
            @focus="editTrue(true)"
            @blur="editTrue(false)"
            autofocus
            v-model="nodes.node_text"
            @input="editNode"
            :id="nodes.node_id"
            v-focus
            ref="textentry"
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
          <v-swatches
            v-model="color"
            @input="chooseColor(color, nodes.node_id)"
            :swatches="swatches"
            :shapes="shapes"
            show-border
            show-fallback
            fallback-input-type="color"
          >
            <SvgButton3 buttonClass="nodes" @click.prevent slot="trigger" />
          </v-swatches>
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
import SvgButton3 from '@/components/SvgButton3'
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'

var readmode
export default {
  name: 'ListLayer',

  props: {
    added: Boolean,
  },

  data: function () {
    return {
      color: '#9bc2d8',
      shapes: 'circles',
      // swatches: [{ color: '#F493A7', showBorder: true }],
      swatches: [
        ['#EB5757', '#F2994A', '#F2C94C'],
        ['#219653', '#27AE60', '#6FCF97'],
        ['#2F80ED', '#2D9CDB', '#56CCF2'],
        ['#9B51E0', '#BB6BD9', '#E9B7FC'],
      ],
      localreadmode: false,
      myArray: null,
      update: false,
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
      // toolmode: (state) => state.ui.mode,
    }),

    nodes_filtered: function () {
      return this.myNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },
  },

  mounted() {
    setTimeout(this.loadData, 500)

    const unwatch = this.$watch('nodes_filtered', (value) => {
      this.$options.myArray = this.nodes_filtered
      this.$forceUpdate()
      // this.focusInput()
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
    // focusInput() {
    //   console.log('focus')
    //   this.nextTick(() => {
    //     this.$refs.textentry.$el.focus()
    //   })
    // },

    chooseColor(color, nodeid) {
      this.$store.dispatch('colorNode', { nodeid, color })
      this.$options.myArray = this.nodes_filtered
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
    SvgButton3,
    VSwatches,
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
