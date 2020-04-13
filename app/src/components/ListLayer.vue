<template>
  <div class="list">
    <ul v-for="value in myNodes" v-bind:key="value.node_id">
      <li
        class="dataeach"
        v-if="nodeid == value.node_id"
        :inner-html.prop="value.node_text | marked"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

export default {
  name: 'ListLayer',
  props: {
    nodeid: String,
    nodetext: String,
  },

  computed: mapState({
    myNodes: (state) => state.myNodes,
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
