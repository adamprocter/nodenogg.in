<template>
  <pzc v-bind:width="2000" v-bind:height="2000">
    <h1>Inner</h1>
  </pzc>
</template>

<script>
import { mapState } from 'vuex'
import PanZoomContainer from '../experimental/PanZoomContainer'
export default {
  name: 'Sandbox',
  data: function() {
    return {}
  },
  components: {
    pzc: PanZoomContainer
  },
  computed: mapState({
    myVersion: state => state.version
  })
}
</script>

<style scoped>
.container {
  width: 600px;
  height: 600px;
}
.board {
  background: grey;
  width: 1200px;
  height: 1200px;
}
</style>
