<template>
  <div class="connections">
    <canvas id="pixi"></canvas>
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
      var canvas = document.getElementById('pixi')
      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        view: canvas,
      })
      let graphics = new PIXI.Graphics()
      graphics.lineStyle(8, 0xcab6ff)

      for (i = 0; i < Object.keys(this.configConnections).length; i++) {
        //console.log('tock')
        //console.log(this.configConnections[i].x_pos_start)
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
      app.stage.addChild(graphics)
    },
  },
  mounted() {
    this.drawPixi()
  },
}
</script>
