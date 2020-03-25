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
        @editTrue="(e) => editTrue(e)"
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
import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'

export default {
  name: 'Home',
  // Shortcut mixin is here so we can call the keyboard controls anytime
  mixins: [shortcutsMixin],
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyPress)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  },

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
    otherNodes: state => state.otherNodes,
    shortcutstate: state => state.shortcutstate
  }),
  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },

    editTrue(e) {
      this.$store.dispatch('shortcutState', e)
    },

    // This is here to support the shortcuts
    addNode() {
      this.$store.dispatch('addNode')
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
