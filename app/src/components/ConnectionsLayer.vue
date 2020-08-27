<template>
  <div class="connections">
    <canvas ref="pixi" id="pixi"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as PIXI from 'pixi.js'

export default {
  name: 'ConnectionsLayer',
  computed: mapState({
    configConnections: (state) => state.configConnections,
  }),

  watch: {
    configConnections: {
      deep: true,

      handler() {
        this.drawPixi()
      },
    },
  },

  methods: {
    drawPixi() {
      var i
      this.canvas = this.$refs.pixi
      const stage = this.PIXIApp.stage
      let graphics = new PIXI.Graphics()
      graphics.lineStyle(8, 0xcab6ff)

      for (i = 0; i < Object.keys(this.configConnections).length; i++) {
        //start
        graphics.moveTo(
          this.configConnections[i].x_pos_start,
          this.configConnections[i].y_pos_start
        )
        //end
        graphics.lineTo(
          this.configConnections[i].x_pos_end,
          this.configConnections[i].y_pos_end
        )
      }
      for (var j = stage.children.length - 1; j >= 0; j--) {
        stage.removeChild(stage.children[j])
      }
      stage.addChild(graphics)
    },
  },
  mounted() {
    const canvas = this.$refs.pixi
    this.PIXIApp = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: true,
      view: canvas,
    })
    this.drawPixi()
  },
}
</script>
