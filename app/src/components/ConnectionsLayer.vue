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

  data() {
    return {
      //  localtoolstate: this.toolmode,
    }
  },
  computed: mapState({
    configConnections: (state) => state.configConnections,
    configPositions: (state) => state.configPositions,
    myNodes: (state) => state.myNodes,
    otherNodes: (state) => state.otherNodes,
    toolmode: (state) => state.ui.mode,
    connectionstate: (state) => state.connectionstate,
  }),

  watch: {
    configConnections: {
      deep: true,

      handler() {
        this.connectionsDraw()
      },
    },
    toolmode: {
      handler() {
        this.toolState()
      },
    },
  },

  methods: {
    toolState() {
      if (this.toolmode == 'connect') {
        this.buttonsDraw()
      } else {
        this.connectionsDraw()
      }
    },

    makeConnection() {
      // var i
      // var j
      // for (i = 0; i < Object.keys(this.myNodes).length; i++) {
      //   for (j = 0; j < Object.keys(this.configPositions).length; j++) {
      //     if (this.configPositions[j].node_id == this.myNodes[i].node_id) {
      //       console.log(this.myNodes[i].node_id)
      //     }
      //   }
      // }
      // if (this.connectionstate == false) {
      //   fromnode = id
      //   xposstart = xpos
      //   yposstart = ypos
      //   //count = 1
      //   this.$store.dispatch('connectionState', true)
      // } else if (this.connectionstate == true) {
      //   tonode = id
      //   xposend = xpos
      //   yposend = ypos
      //   // count = 0
      //   this.$store.dispatch('connectionState', false)
      //   this.$store.dispatch('makeConnect', {
      //     fromnode,
      //     tonode,
      //     xposstart,
      //     yposstart,
      //     xposend,
      //     yposend,
      //   })
      // }
    },
    buttonsDraw() {
      var i
      var j

      var ref = this
      this.canvas = this.$refs.pixi
      const stage = this.PIXIApp.stage
      let buttons = new PIXI.Graphics()

      for (i = 0; i < Object.keys(this.myNodes).length; i++) {
        for (j = 0; j < Object.keys(this.configPositions).length; j++) {
          if (this.configPositions[j].node_id == this.myNodes[i].node_id) {
            buttons.lineStyle(0)
            buttons.beginFill(0xcab6ff, 1)
            // x, y, radius
            buttons.drawCircle(
              this.configPositions[j].x_pos + this.configPositions[j].width,
              this.configPositions[j].y_pos +
                this.configPositions[j].height / 2,
              15
            )
            buttons.endFill()
            // names it the last one only?
            buttons.name = this.myNodes[i].node_id
          }
        }
      }
      for (i = 0; i < Object.keys(this.otherNodes).length; i++) {
        for (j = 0; j < Object.keys(this.configPositions).length; j++) {
          if (this.configPositions[j].node_id == this.otherNodes[i].node_id) {
            buttons.lineStyle(0)
            buttons.beginFill(0xcab6ff, 1)
            // x, y, radius
            buttons.drawCircle(
              this.configPositions[j].x_pos + this.configPositions[j].width,
              this.configPositions[j].y_pos +
                this.configPositions[j].height / 2,
              15
            )
            buttons.endFill()
            // names it the last one only
            buttons.name = this.otherNodes[i].node_id
          }
        }
      }
      let line = new PIXI.Graphics()

      var initialMoveTo
      // Opt-in to interactivity
      buttons.interactive = true
      // Shows hand cursor
      buttons.buttonMode = true

      buttons
        .on('pointerdown', onDragStart)
        .on('pointerdown', start)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)

      let lines = []

      function start() {
        ref.makeConnection()
      }

      function onDragStart(event) {
        this.dragging = true
        // returns on the last one in the loop
        console.log(this.name)
        let mouseX = event.data.global.x
        let mouseY = event.data.global.y

        initialMoveTo = [mouseX, mouseY]

        line.lineStyle(8, 0xcab6ff)
        line.moveTo(mouseX, mouseY)

        lines = [line].concat(lines)

        stage.addChild(line)
      }

      function onDragEnd() {
        // console.log(this.name)
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

      stage.addChild(buttons)
    },

    connectionsDraw() {
      var i

      this.canvas = this.$refs.pixi
      const stage = this.PIXIApp.stage
      let graphics = new PIXI.Graphics()
      //let line = new PIXI.Graphics()

      graphics.lineStyle(8, 0xcab6ff)
      // move the lines to start and end pos based on if to_node == node_id
      // or from_id == node_id
      // this will put them in the same place as buttons

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
      for (var l = stage.children.length - 1; l >= 0; l--) {
        stage.removeChild(stage.children[l])
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
    this.connectionsDraw()
    this.buttonsDraw()
  },
}
</script>
