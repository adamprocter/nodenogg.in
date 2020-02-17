<template>
  <div class="canvas">
    <!-- canvas element draws the connection and nodes -->
    <canvas ref="canvas"></canvas>
    <!-- textarea is the cards/nodes -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { draw } from './mixins/draw.js'

var canvas = null

export default {
  name: 'CanvasLayer',
  mixins: [draw],

  computed: mapState({
    configConnect: state => state.configConnect,
    configHandle: state => state.configHandle
  }),

  mounted() {
    canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
    this.draw()
  },
  methods: {
    clear(ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  border: 1px solid black;
}
</style>
