// FIXME: Everything below is OLD code

<template>
  <div class="yourdata" name="anchorName">
    <div v-for="value in myNodes" v-bind:key="value.node_id">
      <textarea
        v-if="nodeid == value.node_id"
        @focus="editTrue(true)"
        @blur="editTrue(false)"
        autofocus
        @input="editNode"
        v-model="value.node_text"
        :id="nodeid"
        class="drag-cancel"
        ref="nodetext"
        placeholder="Idea goes here!"
      ></textarea>
    </div>

    <div class="btn-row">
      <BaseButton buttonClass="danger" @click="deleteFlag()">Delete</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OffLine',
  computed: mapState({
    myNodes: (state) => state.myNodes,
  }),

  props: {
    nodeid: String,
  },

  methods: {
    addDoc() {
      this.$store.dispatch('addDoc')
      this.$emit('editMode')
    },
    editTrue(e) {
      this.$emit('editTrue', e)
      //// console.log(e)
    },

    editNode(e) {
      var nodeid = e.target.id
      var nodetext = e.target.value
      this.$store.dispatch('editNode', { nodeid, nodetext })
    },

    deleteFlag(e) {
      e = this.nodeid
      this.$store.dispatch('deleteFlag', { e })
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
