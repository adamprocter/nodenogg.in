<template>
  <div class="otherlist">
    <ul v-for="value in otherNodes" v-bind:key="value.node_id">
      <li
        class="dataeach"
        v-if="nodeid == value.node_id"
        :inner-html.prop="value.node_text | marked"
      >
        {{ nodeid }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

export default {
  name: 'OtherListlayer',
  props: {
    nodeid: String,
    nodetext: String,
  },

  computed: mapState({
    otherNodes: (state) => state.otherNodes,
  }),

  filters: {
    // need to write a reverse data filter I suspect here so new data is at the top of list
    marked: marked,
  },
}
</script>

<style lang="css" scoped>
li {
  margin-bottom: -15px;
}
</style>
