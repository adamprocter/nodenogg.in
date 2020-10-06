<template>
  <div>
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <div class="nodes" v-if="nodeid == value.node_id && deleted == false">
        <form>
          <!-- <div v-if="posvalue.read_mode == false"> -->
          <div v-for="value in $options.myArray" v-bind:key="value.node_id">
            <div v-if="value.deleted == false">
              <textarea
                v-if="nodeid == value.node_id"
                @focus="editTrue(true)"
                @blur="editTrue(false)"
                autofocus
                v-model="value.node_text"
                @input="editNode"
                :id="value.node_id"
                ref="nodetext"
                placeholder="Idea goes here!"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    configPositions: (state) => state.configPositions,
  }),

  myArray: null,
  created() {
    this.$options.myArray = this.myNodes
  },

  methods: {
    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    editTrue(e) {
      this.$emit('editTrue', e)
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
}

textarea {
  width: 90%;
  height: 175px;
  resize: none;
  box-sizing: border-box;
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 1em;
  border: none;
  outline: none;
  background-color: rgb(187, 227, 255);
  scrollbar-color: yellow rgb(187, 227, 255);
}
</style>
