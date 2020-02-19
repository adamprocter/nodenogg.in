<template>
  <div class="home">
    <otherNodeslayer
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
</template>

<script>
// @ is an alias to /src
import CanvasLayer from '@/components/CanvasLayer.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import otherNodeslayer from '@/components/otherNodeslayer.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    CanvasLayer,
    NodesLayer,
    otherNodeslayer,
    ControlsLayer
  },
  computed: mapState({
    myNodes: state => state.myNodes,
    otherNodes: state => state.otherNodes
  })
}
</script>

<style scoped></style>
