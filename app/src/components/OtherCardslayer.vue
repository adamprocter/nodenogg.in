<template>
  <div>
    <div v-if="deleted == false">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
export default {
  name: 'OtherCardslayer',

  data: function () {
    return {}
  },

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  computed: mapState({
    otherNodes: (state) => state.otherNodes,
    configEmoji: (state) => state.configEmoji,
  }),

  filters: {
    marked: marked,
  },
}
</script>

<style lang="css" scoped>
.nodes {
  min-width: 343px;
  max-width: 343px;
  border: 2px solid black;
  background-color: rgb(205, 234, 255);
  margin-top: 1em;
  margin-left: 0.5em;
  margin-right: 0.5em;
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
