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
    toolmode: (state) => state.ui.mode,
  }),
  methods: {},
}

var canvas = document.getElementById('pixi')

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  transparent: true,
  view: canvas,
})

let graphics = new PIXI.Graphics()
graphics.x = app.renderer.width / 2
graphics.y = app.renderer.width / 2
app.stage.addChild(graphics)

graphics.lineStyle(0)
graphics.beginFill(0xde3249, 1)
graphics.drawCircle(100, 250, 50)
graphics.endFill()

graphics.lineStyle(0)
graphics.beginFill(0xde3249, 1)
graphics.drawCircle(300, 250, 50)
graphics.endFill()

graphics.lineStyle(2, 0xffffff, 1)
graphics.moveTo(100, 250)
graphics.lineTo(300, 250)

graphics.lineStyle(2, 0xffffff, 1)
graphics.moveTo(0, 0)

// Opt-in to interactivity
// graphics.interactive = true

// // Shows hand cursor
// graphics.buttonMode = true

// graphics
//   .on('pointerdown', onDragStart)
//   .on('pointerup', onDragEnd)
//   .on('pointerupoutside', onDragEnd)
//   .on('pointermove', onDragMove)

// let lines = []
// let initialMoveTo

// function onDragStart(event) {
//   this.dragging = true

//   let mouseX = event.data.global.x
//   let mouseY = event.data.global.y

//   initialMoveTo = [mouseX, mouseY]

//   let line = new PIXI.Graphics()
//   line.lineStyle(6, 0xffffff)
//   line.moveTo(mouseX, mouseY)

//   lines = [line].concat(lines)

//   app.stage.addChild(line)
// }

// function onDragEnd() {
//   this.dragging = false
// }

// function onDragMove(event) {
//   if (this.dragging) {
//     let mouseX = event.data.global.x
//     let mouseY = event.data.global.y
//     lines[0].clear()
//     lines[0].lineStyle(6, 0xffffff)
//     lines[0].moveTo(initialMoveTo[0], initialMoveTo[1])
//     lines[0].lineTo(mouseX, mouseY)
//   }
// }
</script>
