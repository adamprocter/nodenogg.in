<template>
  <div ref="container" class="wrapper" v-bind:style="modeContainerStyle">
    <PanZoomContainer
      v-bind:width="width"
      v-bind:height="height"
      v-bind:scale="scale"
      v-bind:translation="translation"
    >
      <h1>Nodes</h1>
    </PanZoomContainer>
    <SelectionLayer
      v-if="domContainerReady"
      v-bind:shape="interaction.shape"
      v-bind:width="elementWidth"
      v-bind:height="elementHeight"
    />
    <ModeToolbar />
    <ViewToolbar />
  </div>
</template>

<script>
import PanZoomContainer from '@/experimental/PanZoomContainer'
import ModeToolbar from '@/experimental/ModeToolbar'
import ViewToolbar from '@/experimental/ViewToolbar'
import SelectionLayer from '@/experimental/layers/SelectionLayer'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Sandbox',
  data: function() {
    return {
      elementWidth: undefined,
      elementHeight: undefined,
      width: 2000,
      height: 2000
    }
  },
  computed: {
    domContainerReady() {
      return !!this.elementWidth && !!this.elementHeight
    },
    ...mapState({
      interaction: state => state.ui.interaction,
      scale: state => state.ui.scale,
      translation: state => state.ui.translation
    }),
    ...mapGetters({
      activeMode: 'ui/activeMode',
      modeContainerStyle: 'ui/modeContainerStyle'
    })
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const { offsetWidth, offsetHeight } = this.$refs.container
      this.elementWidth = offsetWidth
      this.elementHeight = offsetHeight
    }
  },
  components: {
    ModeToolbar,
    ViewToolbar,
    PanZoomContainer,
    SelectionLayer
  }
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
