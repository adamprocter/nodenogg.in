<template>
  <div>
    <h1 class="mobile">Your Nodes in list mode</h1>
    <!-- <OffLine
      v-for="value in myNodes"
      v-bind:key="value.node_id"
      v-bind:nodeid="value.node_id"
      v-bind:nodetext="value.node_text"
      @editTrue="(e) => editTrue(e)"
    /> -->

    <div v-for="value in myNodes" v-bind:key="value.node_id">
      <textarea
        @focus="editTrue(true)"
        @blur="editTrue(false)"
        autofocus
        @input="editNode"
        v-model="value.node_text"
        :id="nodeid"
        ref="nodetext"
        placeholder="Idea goes here!"
      ></textarea>
    </div>

    <!-- <OnBoard @clientAdded="clientAdded()" @editTrue="(e) => editTrue(e)" /> -->

    <ModeToolbar />
  </div>
</template>

<script>
// import OffLine from '@/components/OffLine'
// import OnBoard from '@/components/OnBoard.vue'
import ModeToolbar from '@/experimental/ModeToolbar'
import { mapState } from 'vuex'

export default {
  name: 'List',

  data: function () {
    return {
      clientset: false,
      offline: false,
    }
  },

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  computed: mapState({
    myNodes: (state) => state.myNodes,
  }),

  components: {
    // OnBoard,
    // OffLine,
    ModeToolbar,
  },

  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },

    editTrue(e) {
      this.$store.dispatch('shortcutState', e)
    },

    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },
  },
}
</script>

<style lang="css" scoped>
.mobile {
  font-size: 1em;
}
</style>
