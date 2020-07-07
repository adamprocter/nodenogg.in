<template>
  <canvas ref="canvas" v-bind:width="width" v-bind:height="height"></canvas>
</template>

<script>
import { palette } from '@/experimental/constants/color'

import { clear } from '@/experimental/utils/canvas'

export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    shape: {
      type: Object,
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    this.draw()
  },
  data() {
    return {
      canvas: {},
      context: {},
      color: palette.blue.dark,
    }
  },
  // Watch the props for changes and, if necessary, redraw canvas
  watch: {
    width() {
      this.draw()
    },
    height() {
      this.draw()
    },
    shape() {
      this.draw()
    },
    selected() {
      this.draw()
    },
  },
  methods: {
    /**
     * Clears the context, renders selection
     **/
    draw() {
      clear(this.context, this.canvas.width, this.canvas.height)
      this.renderSelection()
    },

    renderSelection() {
      this.context.globalAlpha = 0.75
      if (this.shape) {
        this.context.globalAlpha = 0.5
        const { x, y, width, height } = this.shape
        this.context.fillStyle = this.color
        this.context.setTransform(1, 0, 0, 1, x, y)
        this.context.beginPath()

        this.context.fillRect(0, 0, width, height)
        this.context.closePath()

        this.context.setTransform(1, 0, 0, 1, 0, 0)
      }
    },
  },
}
</script>
<style scoped>
canvas {
  z-index: 3;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* opacity: 0.5; */
}
</style>
