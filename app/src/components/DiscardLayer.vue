<template>
  <div>
    <div v-if="deleted == true">
      <div class="nodes">
        <p :inner-html.prop="nodetext | marked"></p>

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
          <BaseButton buttonClass="danger" @click="restoreNode(nodeid)"
            >Restore</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
export default {
  name: 'ListLayer',

  data: function () {
    return {}
  },

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  computed: mapState({
    myNodes: (state) => state.myNodes,
    configEmoji: (state) => state.configEmoji,
  }),

  filters: {
    marked: marked,
  },

  methods: {
    restoreNode(e) {
      this.$store.dispatch('restoreNode', { e })
    },
  },
}
</script>

<style lang="css" scoped>
h2 {
  color: red;
}

.nodes {
  width: 95%;
  border: 2px dashed black;
  background-color: rgb(155, 194, 216);
  margin-top: 1em;
  margin-left: 1em;
}

p {
  width: 90%;
  /* height: 175px; */
  resize: none;
  box-sizing: border-box;
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 1em;
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
</style>
