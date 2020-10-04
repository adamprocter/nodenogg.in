<template>
  <div>
    <div v-for="(value, index) in configPositions" v-bind:key="index">
      <div v-if="nodeid == value.node_id && deleted == false">
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
    //  shortcutstate: (state) => state.shortcutstate,
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
      // this.firstload = false
      //  // console.log(e)
    },
  },
}
</script>

<style lang="css" scoped>
h2 {
  color: red;
}

textarea {
  width: 95%;
  height: 100px;
  margin-left: 1em;
  margin-bottom: 1em;
}
</style>
