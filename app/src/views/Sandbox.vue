<template>
  <div class="wrapper" v-bind:style="modeContainerStyle">
    <PanZoomContainer
      v-bind:width="width"
      v-bind:height="height"
      v-bind:scale="scale"
      v-bind:translation="translation"
      v-bind:pan="activeMode.view.pan"
      v-bind:zoom="activeMode.view.zoom"
    >
      <h1>Nodes</h1>
    </PanZoomContainer>
    <ModeToolbar />
    <ViewToolbar />
  </div>
</template>

<script>
import PanZoomContainer from '@/experimental/PanZoomContainer'
import ModeToolbar from '@/experimental/ModeToolbar'
import ViewToolbar from '@/experimental/ViewToolbar'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Sandbox',
  data: function() {
    return {
      width: 2000,
      height: 2000
    }
  },
  computed: {
    ...mapState({
      scale: state => state.ui.scale,
      translation: state => state.ui.translation
    }),
    ...mapGetters({
      activeMode: 'ui/activeMode',
      modeContainerStyle: 'ui/modeContainerStyle'
    })
  },
  components: {
    ModeToolbar,
    ViewToolbar,
    PanZoomContainer
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
