<template>
  <div>
    <div ref="container" class="wrapper" v-bind:style="modeContainerStyle">
      <PanZoomContainer
        v-bind:width="width"
        v-bind:height="height"
        v-bind:scale="scale"
        v-bind:translation="translation"
      >
        <div v-if="clientset">
          <OtherNodeslayer />
          <NodesLayer @edit-true="(e) => editTrue(e)" :added="added" />
          <TipsLayer />
          <ModeCardorg />
          <ConnectionsLayer />
        </div>

        <div v-else>
          <OtherNodeslayer />
          <NodesLayer @edit-true="(e) => editTrue(e)" :added="added" />
          <OnBoard
            @client-added="clientAdded()"
            @edit-true="(e) => editTrue(e)"
          />
          <ConnectionsLayer />
        </div>
        <!-- <ScribbleLayer v-bind:drawready="drawready"></ScribbleLayer> -->
      </PanZoomContainer>
      <!-- <ToolBar /> -->

      <ModeToolbar
        @upload-added="uploadAdded()"
        @copy-done="copyDone()"
        @draw-on="drawOn()"
        @draw-off="drawOff()"
        @add-node="addNode()"
      />
      <ViewToolbar />
      <UploadLayer
        class="orgupload"
        v-bind:uploadready="uploadready"
        v-bind:copyready="copyready"
        @upload-added="uploadAdded()"
        @copy-done="copyDone()"
      />
    </div>
  </div>
</template>

<script>
import PanZoomContainer from '@/experimental/PanZoomContainer'
import ConnectionsLayer from '@/components/ConnectionsLayer'
import NodesLayer from '@/components/NodesLayer'

// import ToolBar from '@/components/ToolBar'
//import ScribbleLayer from '@/components/ScribbleLayer'
import UploadLayer from '@/components/UploadLayer'
import OtherNodeslayer from '@/components/OtherNodeslayer.vue'
import OnBoard from '@/components/OnBoard.vue'
import TipsLayer from '@/components/TipsLayer.vue'
import ModeCardorg from '@/components/ModesCardorg.vue'
import ModeToolbar from '@/experimental/ModeToolbar'
import ViewToolbar from '@/experimental/ViewToolbar'
// import SelectionLayer from '@/experimental/layers/SelectionLayer'
import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Organise',
  mixins: [shortcutsMixin],
  data: function () {
    return {
      elementWidth: undefined,
      elementHeight: undefined,
      width: 2000,
      height: 2000,
      clientset: false,
      // listview: false,
      added: true,

      uploadready: false,
      copyready: false,
      drawready: false,

      // shortcutstate: false,
    }
  },

  // beforeRouteLeave(to, from, next) {
  //   this.$store.commit('GET_ALL_NODES')
  //   next()
  // },
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
    var e = false
    this.$store.dispatch('shortcutState', e)
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
      this.added = !this.added
    },
    selectMode(mode) {
      this.$store.commit('ui/setMode', mode)
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
    // ToolBar,

    UploadLayer,
    // ScribbleLayer,
    TipsLayer,
    ModeCardorg,
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
.orgupload {
}

.a {
  fill: #333;
  stroke: #707070;
}
.b {
  fill: #fff;
  stroke: #333;
}
.b,
.c {
  stroke-width: 7px;
}
.c,
.e {
  fill: none;
}
.c {
  stroke: #2d9cdb;
}
.d {
  stroke: none;
}
</style>
