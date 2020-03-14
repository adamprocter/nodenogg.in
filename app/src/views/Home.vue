<template>
  <div class="home">
    <div v-if="clientset">
      <OtherNodeslayer
        v-for="value in otherNodes"
        v-bind:key="value.node_id"
        v-bind:nodeid="value.node_id"
        v-bind:nodetext="value.node_text"
      />

      <NodesLayer
        v-for="value in myNodes"
        v-bind:key="value.node_id"
        v-bind:nodeid="value.node_id"
        v-bind:nodetext="value.node_text"
      />

      <ControlsLayer />
    </div>
    <OnBoard v-else @clientAdded="clientAdded()" />
  </div>
</template>

<script>
// @ is an alias to /src
import OnBoard from '@/components/OnBoard.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',

  data: function() {
    return {
      clientset: false,
      offline: false
    }
  },

  components: {
    OnBoard,
    NodesLayer,
    OtherNodeslayer,
    ControlsLayer
  },
  computed: mapState({
    myNodes: state => state.myNodes,
    otherNodes: state => state.otherNodes
  }),
  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },

    offlineTriggered() {
      this.offline = true
    },
    onlineTriggered() {
      this.offline = false
    }
  }
}
</script>

<style scoped></style>
