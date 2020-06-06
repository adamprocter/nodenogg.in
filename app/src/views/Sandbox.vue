<template>
  <div ref="container" class="wrapper" v-bind:style="modeContainerStyle">
    <ConnectionsLayer
      v-bind:width="width"
      v-bind:height="height"
      v-bind:connections="connections"
    />
    <PanZoomContainer
      v-bind:width="width"
      v-bind:height="height"
      v-bind:scale="scale"
      v-bind:translation="translation"
    >
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
      </div>
      <OnBoard v-else @clientAdded="clientAdded()" />
    </PanZoomContainer>
    <!-- <SelectionLayer
      v-if="domContainerReady"
      v-bind:shape="interaction.shape"
      v-bind:width="elementWidth"
      v-bind:height="elementHeight"
    /> -->
    <ModeToolbar
      @offlineTriggered="offlineTriggered()"
      @onlineTriggered="onlineTriggered()"
    />
    <ViewToolbar />
  </div>
</template>

<script>
import PanZoomContainer from '@/experimental/PanZoomContainer'
import ConnectionsLayer from '@/experimental/layers/ConnectionsLayer'
import NodesLayer from '@/components/NodesLayer'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import OnBoard from '@/components/OnBoard.vue'
import ModeToolbar from '@/experimental/ModeToolbar'
import ViewToolbar from '@/experimental/ViewToolbar'
// import SelectionLayer from '@/experimental/layers/SelectionLayer'
import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Sandbox',
  mixins: [shortcutsMixin],
  data: function () {
    return {
      elementWidth: undefined,
      elementHeight: undefined,
      width: 2000,
      height: 2000,
      clientset: false,
      listview: false,
      offline: false,
    }
  },
  computed: {
    domContainerReady() {
      return !!this.elementWidth && !!this.elementHeight
    },
    ...mapState({
      interaction: (state) => state.ui.interaction,
      scale: (state) => state.ui.scale,
      translation: (state) => state.ui.translation,
      myNodes: (state) => state.myNodes,
      otherNodes: (state) => state.otherNodes,
      shortcutstate: (state) => state.shortcutstate,
      connections: (state) => state.configConnections,
    }),
    ...mapGetters({
      activeMode: 'ui/activeMode',
      modeContainerStyle: 'ui/modeContainerStyle',
    }),
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

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

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const { offsetWidth, offsetHeight } = this.$refs.container
      this.elementWidth = offsetWidth
      this.elementHeight = offsetHeight
    },

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
    },
  },
  components: {
    ModeToolbar,
    ViewToolbar,
    PanZoomContainer,
    // SelectionLayer,
    NodesLayer,
    OtherNodeslayer,
    ConnectionsLayer,
    OnBoard,
  },
}
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 120px);
  width: calc(100%-80px);
  margin: 40px;
  position: relative;
}
</style>
