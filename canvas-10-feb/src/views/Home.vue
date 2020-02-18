<template>
  <div class="home">
    <!-- The number of NodesLayers comes from store -->
    <NodesLayer
      v-for="(value, index) in configNodes"
      v-bind:key="index"
      v-bind:nodeid="value.id"
      v-bind:nodetext="value.text"
    />
    <CanvasLayer />
    <ControlsLayer />
  </div>
</template>

<script>
// @ is an alias to /src
import CanvasLayer from '@/components/CanvasLayer.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    CanvasLayer,
    NodesLayer,
    ControlsLayer
  },
  computed: mapState({
    configNodes: state => state.configNodes
  })
}
</script>

<style scoped></style>
