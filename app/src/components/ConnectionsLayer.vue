<template>
  <div class="connections">
    <canvas ref="pixi" id="pixi"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as PIXI from 'pixi.js'
//var initialMoveTo

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
      //let line = new PIXI.Graphics()

      graphics.lineStyle(8, 0xcab6ff)

      // FIXME: removes connections probably need to be own function
      // for (i = 0; i < Object.keys(this.configConnections).length; i++) {
      //   // static circle - needs to be same place as buttons
      //   graphics.lineStyle(0)
      //   graphics.beginFill(0xde3249, 1)
      //   graphics.drawCircle(100, 250, 50)
      //   graphics.endFill()
      //   stage.addChild(graphics)
      // }

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

    //FIXME : this is a sketch of the final code for connection buttons
    // Eventually can move this all from nodes layers as well (which make sense)
    connectingDraw() {
      var i
      this.canvas = this.$refs.pixi
      const stage = this.PIXIApp.stage
      let circle = new PIXI.Graphics()
      let line = new PIXI.Graphics()

      circle.lineStyle(8, 0xcab6ff)

      for (i = 0; i < Object.keys(this.configConnections).length; i++) {
        // static circle - needs to be same place as buttons
        circle.lineStyle(0)
        circle.beginFill(0xde3249, 1)
        circle.drawCircle(100, 250, 50)
        circle.endFill()
        stage.addChild(circle)
      }

      // connection on move
      var initialMoveTo
      // Opt-in to interactivity
      circle.interactive = true

      // Shows hand cursor
      circle.buttonMode = true

      circle
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)

      let lines = []

      function onDragStart(event) {
        this.dragging = true

        let mouseX = event.data.global.x
        let mouseY = event.data.global.y

        initialMoveTo = [mouseX, mouseY]

        line.lineStyle(8, 0xcab6ff)
        line.moveTo(mouseX, mouseY)

        lines = [line].concat(lines)

        stage.addChild(line)
      }

      function onDragEnd() {
        this.dragging = false
        stage.removeChild(line)
      }

      function onDragMove(event) {
        if (this.dragging) {
          let mouseX = event.data.global.x
          let mouseY = event.data.global.y
          lines[0].clear()
          lines[0].lineStyle(8, 0xcab6ff)
          lines[0].moveTo(initialMoveTo[0], initialMoveTo[1])
          lines[0].lineTo(mouseX, mouseY)
        }
      }
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
    this.connectingDraw()
  },
}
</script>
