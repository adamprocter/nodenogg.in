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
    // reverse  was added to the view (List.vue) for reference (didnt need filter)
    marked: marked,
  },
}
</script>

<style lang="css" scoped>
li {
  margin-bottom: -15px;
}
</style>
