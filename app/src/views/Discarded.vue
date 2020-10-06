<template>
  <div>
    <div v-if="clientset">
      <div id="discardwrapper">
        <h1 class="mobile">Your discarded nodes - list mode</h1>

        <DiscardLayer
          v-for="value in myNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
          v-bind:deleted="value.deleted"
        />
      </div>
    </div>
    <div v-else>
      <OnBoard @clientAdded="clientAdded()" @editTrue="(e) => editTrue(e)" />
    </div>
  </div>
</template>

<script>
import Router from '@/router'
import DiscardLayer from '@/components/DiscardLayer'
import OnBoard from '@/components/OnBoard'
import { mapState } from 'vuex'

export default {
  name: 'Discarded',

  data: function () {
    return {
      localmicrocosm: Router.currentRoute.params.microcosm,
      clientid: '',
      clientset: false,
      offline: false,
      name: false,
      microcosm: false,
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
    DiscardLayer,
    OnBoard,
  },

  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },
  },
}
</script>

<style lang="css" scoped>
#discardwrapper {
  margin-left: 1em;
  margin-bottom: 1em;
}
.mobile {
  font-size: 1em;
}
.new {
  margin-bottom: 1em;
}
</style>
