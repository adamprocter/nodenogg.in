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

      <!-- <CanvasLayer /> -->
      <LinksLayer
        v-bind:width="width"
        v-bind:height="height"
        v-bind:nodes="nodes"
        v-bind:links="links"
      />
      <DeBug />
      <ControlsLayer />
    </div>
    <OnBoard v-else @clientAdded="clientAdded()" />
  </div>
</template>

<script>
// @ is an alias to /src
import OnBoard from '@/components/OnBoard.vue'
import LinksLayer from '@/components/LinksLayer.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import DeBug from '@/components/DeBug.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',

  data: function() {
    return {
      clientset: false,
      offline: false,
      width: 1200,
      height: 800
    }
  },

  components: {
    OnBoard,
    LinksLayer,
    NodesLayer,
    OtherNodeslayer,
    DeBug,
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
