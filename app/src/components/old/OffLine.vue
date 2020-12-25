// FIXME: Everything below is OLD code

<template>
  <div class="yourdata" name="anchorName">
    <div v-for="(nodes, index) in $options.myArray" v-bind:key="index">
      <textarea
        @focus="editTrue(true)"
        @blur="editTrue(false)"
        autofocus
        @input="editNode"
        v-model="nodes.node_text"
        :id="nodes.node_id"
        class="drag-cancel"
        ref="nodetext"
        placeholder="Type your thoughts and ideas here! (will sync to couchdb when back online)"
      ></textarea>
    </div>

    <div class="btn-row">
      <BaseButton
        buttonClass="danger"
        @click.prevent="deleteFlag(nodes.node_id)"
        >Discard</BaseButton
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OffLine',

  data() {
    return {
      nodeid: String,
      myArray: null,
    }
  },
  computed: {
    ...mapState({
      myNodes: (state) => state.myNodes,
    }),

    nodes_filtered: function () {
      return this.myNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },
  },

  mounted() {
    setTimeout(this.loadData, 500)
  },

  methods: {
    loadData() {
      this.$options.myArray = this.nodes_filtered
      // this.$options.positionsArray = this.positions_filtered
      this.$forceUpdate()
    },
    // addNode() {
    //   // console.log('add called')
    //   this.$store.dispatch('addNode')
    //   this.added = !this.added
    // },
    editTrue(e) {
      this.$emit('edit-true', e)
      //// console.log(e)
    },

    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    deleteFlag(e) {
      if (confirm('Confirm discard?')) {
        this.$store.dispatch('deleteFlag', { e })
        this.$options.myArray = this.nodes_filtered
      } else {
        // nothing happens
      }
    },
  },
}
</script>

<style lang="css" scoped>
h3 {
  margin-top: 1em;
}

.data p {
  white-space: pre-wrap;
  line-height: 1em;
}
</style>
