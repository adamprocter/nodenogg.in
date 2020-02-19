<template>
  <div class="home">
    <OnBoard @clientAdded="clientAdded()" />
    <div v-if="clientset">
      <NodesLayer
        v-for="value in myNodes"
        v-bind:key="value.nodeid"
        v-bind:nodeid="value.nodeid"
        v-bind:nodetext="value.nodetext"
      />
      <OtherNodeslayer
        v-for="value in otherNodes"
        v-bind:key="value.nodeid"
        v-bind:nodeid="value.nodeid"
        v-bind:nodetext="value.nodetext"
      />
      <CanvasLayer />
      <ControlsLayer />
    </div>
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
      console.log(this.clientset)
    }
  }
}
</script>

<style scoped></style>
