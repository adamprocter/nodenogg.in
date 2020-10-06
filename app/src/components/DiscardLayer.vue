<template>
  <div>
    <form>
      <div v-for="value in myNodes" v-bind:key="value.node_id">
        <div
          class="nodes"
          v-if="nodeid == value.node_id && value.deleted == true"
        >
          <p :inner-html.prop="value.node_text | marked"></p>
          <div class="btn-row">
            <BaseButton
              class="new"
              buttonClass="action"
              @click="restoreNode(value.node_id)"
              >Restore</BaseButton
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

export default {
  name: 'DiscardLayer',

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  computed: mapState({
    myNodes: (state) => state.myNodes,
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
.nodes {
  width: 95%;
  border: 2px dashed black;
  background-color: rgb(155, 194, 216);
  margin-bottom: 1em;
  padding: 0 1em 0 1em;
}

.btn-row {
  margin-bottom: 1em;
}
</style>
