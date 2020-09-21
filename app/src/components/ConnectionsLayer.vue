<template>
  <div class="connections">
    <canvas ref="pixi" id="pixi"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as PIXI from 'pixi.js'
//var initialMoveTo
//var id
var fromnode
var tonode
var xposstart
var yposstart
var xposend
var yposend
var endState = false

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
    // connectionstate: (state) => state.connectionstate,
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

    makeConnection(id, xpos, ypos) {
      if (endState == false) {
        fromnode = id
        xposstart = xpos
        yposstart = ypos
        endState = true
        //count = 1
        // this.$store.dispatch('connectionState', true)
      } else if (endState == true) {
        tonode = id
        xposend = xpos
        yposend = ypos
        // count = 0
        //  this.$store.dispatch('connectionState', false)
        // console.log(fromnode, tonode, xposstart, yposstart, xposend, yposend)
        this.$store.dispatch('makeConnect', {
          fromnode,
          tonode,
          xposstart,
          yposstart,
          xposend,
          yposend,
        })
      }
    },
    buttonsDraw() {
      var i
      var j
      //var n = 1
      var ref = this
      var buttonMap = {}
      var buttonMapOther = {}

      this.canvas = this.$refs.pixi
      const stage = this.PIXIApp.stage

      for (i = 0; i < Object.keys(this.myNodes).length; i++) {
        buttonMap[i] = new PIXI.Graphics()
        // console.log(buttonMap[i])
        for (j = 0; j < Object.keys(this.configPositions).length; j++) {
          if (this.configPositions[j].node_id == this.myNodes[i].node_id) {
            buttonMap[i].name = this.myNodes[i].node_id
            // console.log(button_one.name)
            buttonMap[i].lineStyle(1)
            buttonMap[i].beginFill(0xcab6ff, 1)
            // x, y, radius

            buttonMap[i].drawCircle(
              this.configPositions[j].x_pos + this.configPositions[j].width,
              this.configPositions[j].y_pos +
                this.configPositions[j].height / 2,
              15
            )
            buttonMap[i].endFill()
            // names it the last one only?
          }
          stage.addChild(buttonMap[i])

          // Opt-in to interactivity
          buttonMap[i].interactive = true
          // Shows hand cursor
          buttonMap[i].buttonMode = true
        }

        buttonMap[i]
          .on('pointerdown', onDragStart)
          .on('pointerdown', start)
          .on('pointerup', onDragEnd)
          .on('pointerup', finish)
          .on('pointerupoutside', onDragEndOutside)
          .on('pointermove', onDragMove)
      }

      for (i = 0; i < Object.keys(this.otherNodes).length; i++) {
        buttonMapOther[i] = new PIXI.Graphics()
        // console.log(buttonMap[i])
        for (j = 0; j < Object.keys(this.configPositions).length; j++) {
          if (this.configPositions[j].node_id == this.otherNodes[i].node_id) {
            buttonMapOther[i].name = this.otherNodes[i].node_id
            // console.log(button_one.name)
            buttonMapOther[i].lineStyle(1)
            buttonMapOther[i].beginFill(0xcab6ff, 1)
            // x, y, radius

            buttonMapOther[i].drawCircle(
              this.configPositions[j].x_pos + this.configPositions[j].width,
              this.configPositions[j].y_pos +
                this.configPositions[j].height / 2,
              15
            )
            buttonMapOther[i].endFill()
            // names it the last one only?
          }
          stage.addChild(buttonMapOther[i])

          // Opt-in to interactivity
          buttonMapOther[i].interactive = true
          // Shows hand cursor
          buttonMapOther[i].buttonMode = true
        }

        buttonMapOther[i]
          .on('pointerdown', onDragStart)
          .on('pointerdown', start)
          .on('pointerup', finish)
          .on('pointerup', onDragEnd)
          .on('pointerupoutside', onDragEndOutside)
          .on('pointermove', onDragMove)
      }

      let line = new PIXI.Graphics()

      var initialMoveTo

      let lines = []

      function start(event) {
        // console.log('start')
        this.id = this.name
        ref.makeConnection(this.id, event.data.global.x, event.data.global.y)
      }

      function finish(event) {
        // console.log('finish')
        this.id = this.name
        ref.makeConnection(this.id, event.data.global.x, event.data.global.y)
      }

      function onDragStart(event) {
        this.dragging = true
        // returns on the last one in the loop
        // console.log(button_one.name)
        let mouseX = event.data.global.x
        let mouseY = event.data.global.y

        initialMoveTo = [mouseX, mouseY]

        line.lineStyle(8, 0xcab6ff)
        line.moveTo(mouseX, mouseY)

        lines = [line].concat(lines)

        stage.addChild(line)
      }

      function onDragEnd() {
        //console.log('end')
        this.dragging = false
        stage.removeChild(line)
      }

      function onDragEndOutside() {
        // console.log('Outside')
        endState = false
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

    connectionsDraw() {
      var i
      //  var j
      this.canvas = this.$refs.pixi
      const stage = this.PIXIApp.stage
      let graphics = new PIXI.Graphics()
      //let line = new PIXI.Graphics()

      graphics.lineStyle(8, 0xcab6ff)
      // move the lines to start and end pos based on if to_node == node_id
      // or from_id == node_id
      //start_id == node_id
      // this will put them in the same place as buttons

      //     for (i = 0; i < Object.keys(this.otherNodes).length; i++) {

      // for (j = 0; j < Object.keys(this.configPositions).length; j++) {
      //   if (this.configConnections[j].start_id == this.otherNodes[i].node_id) {

      // for (j = 0; j < Object.keys(this.otherNodes).length; j++) {
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
      //  }
      for (var l = stage.children.length - 1; l >= 0; l--) {
        stage.removeChild(stage.children[l])
      }

      stage.addChild(graphics)
      if (this.toolmode == 'connect') {
        this.buttonsDraw()
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

    this.connectionsDraw()
  },
}
</script>
