<template>
  <div>
    <div class="offline" v-if="clientset && offline">
      <div ref="container" class="wrapper" v-bind:style="modeContainerStyle">
        <h2>Offline</h2>
        <p>
          nodenogg.in appears to be offline, which means you cant see other data
          at this stage, as it maybe out of date. Once you reconnect. Your data
          will sync and the main views will reappear. This maybe down to you or
          maybe us. If you think it's us let us know.
        </p>
        <OffLine
          v-for="value in myNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
          @editTrue="(e) => editTrue(e)"
        />
        <ModeToolbar
          @offlineTriggered="offlineTriggered()"
          @onlineTriggered="onlineTriggered()"
        />
        <ViewToolbar />

        <!-- <OnBoard v-else @clientAdded="clientAdded()" /> -->
      </div>
    </div>

    <div class="online" v-else>
      <div ref="container" class="wrapper" v-bind:style="modeContainerStyle">
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
              v-bind:deleted="value.deleted"
            />
            <TipsLayer />
            <ConnectionsLayer />
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
              v-bind:deleted="value.deleted"
            />
            <OnBoard
              @clientAdded="clientAdded()"
              @editTrue="(e) => editTrue(e)"
            />
            <ConnectionsLayer />
          </div>
          <ScribbleLayer v-bind:drawready="drawready"></ScribbleLayer>
        </PanZoomContainer>

        <ModeToolbar
          @offlineTriggered="offlineTriggered()"
          @onlineTriggered="onlineTriggered()"
          @uploadAdded="uploadAdded()"
          @copyDone="copyDone()"
          @drawOn="drawOn()"
          @drawOff="drawOff()"
        />
        <ViewToolbar />
        <UploadLayer
          v-bind:uploadready="uploadready"
          v-bind:copyready="copyready"
          @uploadAdded="uploadAdded()"
          @copyDone="copyDone()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PanZoomContainer from '@/experimental/PanZoomContainer'
import ConnectionsLayer from '@/components/ConnectionsLayer'
import NodesLayer from '@/components/NodesLayer'
import OffLine from '@/components/OffLine'
import ScribbleLayer from '@/components/ScribbleLayer'
import UploadLayer from '@/components/UploadLayer'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import OnBoard from '@/components/OnBoard.vue'
import TipsLayer from '@/components/TipsLayer.vue'
import ModeToolbar from '@/experimental/ModeToolbar'
import ViewToolbar from '@/experimental/ViewToolbar'
// import SelectionLayer from '@/experimental/layers/SelectionLayer'
import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
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
      uploadready: false,
      copyready: false,
      drawready: false,
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
      toolmode: (state) => state.ui.mode,
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

    uploadAdded() {
      this.uploadready = !this.uploadready
    },

    copyDone() {
      this.copyready = !this.copyready
    },

    clientAdded() {
      this.clientset = !this.clientset
    },

    editTrue(e) {
      this.$store.dispatch('shortcutState', e)
    },

    drawOn() {
      this.drawready = !this.drawready
      //console.log(this.drawready)
    },

    drawOff() {
      this.drawready = false
    },

    // This is here to support the shortcuts
    addNode() {
      this.$store.dispatch('addNode')
    },
    selectMode(mode) {
      this.$store.commit('ui/setMode', mode)
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
    OffLine,
    UploadLayer,
    ScribbleLayer,
    TipsLayer,
  },
}
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 40px);
  width: calc(100%);
  margin: 0px;
  position: relative;
}
</style>
