<template>
  <div class="home">
    <div v-if="clientset">
      <div v-if="listview">
        <ListLayer
          v-for="value in myNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
        />

        <OtherListlayer
          v-for="value in otherNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
        />
      </div>
      <div v-else>
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
      </div>
      <ControlsLayer @listView="listView()" />
    </div>
    <OnBoard v-else @clientAdded="clientAdded()" />
  </div>
</template>

<script>
// @ is an alias to /src
import OnBoard from '@/components/OnBoard.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import ListLayer from '@/components/ListLayer.vue'
import OtherListlayer from '@/components/OtherListlayer.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

import { mapState } from 'vuex'
import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'
// import Router from '@/router'
// console.log(Router.currentRoute.params.microcosm)

export default {
  name: 'Oldhome',
  // Shortcut mixin is here so we can call the keyboard controls anytime
  mixins: [shortcutsMixin],
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyPress)
    }
    if (localStorage.myNNClient == null) {
      // visiting from URL get them to name client
      // localStorage.setItem('myNNClient', 'unknown client')
      // console.log(localStorage.myNNClient)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  },

  data: function () {
    return {
      clientset: false,
      listview: false,
      offline: false,
    }
  },

  components: {
    OnBoard,
    NodesLayer,
    OtherNodeslayer,
    ListLayer,
    OtherListlayer,
    ControlsLayer,
  },
  computed: mapState({
    myNodes: (state) => state.myNodes,
    otherNodes: (state) => state.otherNodes,
    shortcutstate: (state) => state.shortcutstate,
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

    listView() {
      if (this.listview == false) {
        this.listview = true
      } else {
        this.listview = false
      }
    },

    offlineTriggered() {
      this.offline = true
    },
    onlineTriggered() {
      this.offline = false
    },
  },
}
</script>

<style scoped></style>
