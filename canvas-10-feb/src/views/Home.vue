<template>
  <div class="home">
    <div v-if="clientset">
      <OtherNodeslayer
        v-for="value in otherNodes"
        v-bind:key="value.nodeid"
        v-bind:nodeid="value.nodeid"
        v-bind:nodetext="value.nodetext"
      />
      <NodesLayer
        v-for="value in myNodes"
        v-bind:key="value.nodeid"
        v-bind:nodeid="value.nodeid"
        v-bind:nodetext="value.nodetext"
      />

      <CanvasLayer />
      <ControlsLayer />
    </div>
    <OnBoard v-else @clientAdded="clientAdded()" />
  </div>
</template>

<script>
// @ is an alias to /src
import OnBoard from '@/components/OnBoard.vue'
import CanvasLayer from '@/components/CanvasLayer.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',

  data: function() {
    return {
      clientset: false
    }
  },

  components: {
    OnBoard,
    CanvasLayer,
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
    }
  }
}
</script>

<style scoped></style>
