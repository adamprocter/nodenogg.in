<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- <canvas ref="canvas" :width="windowWidth" :height="windowHeight"></canvas> -->
    <canvas ref="canvas" width="150" height="150"></canvas>

    <div class="controls">
      <div class="btn-row">
        <button on:click="popups.showPane = !popups.showPane">Button</button>
      </div>
      <!--
      <div class="popup" v-if="popups.showPane">
        <div class="popup-title">Pane Title</div>
        <label>
          <input type="radio" name="color" />
        </label>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      configRect: {
        x: 10,
        y: 30,
        height: 50,
        width: 50,
        fill: 'rgb(200, 0, 0)'
      }
    }
  },
  mounted() {
    // listen for mouse events
    // this.ctx.onmousedown = myDown
    // this.ctx.onmouseup = myUp
    // this.ctx.onmousemove = myMove

    this.ctx = this.$refs.canvas.getContext('2d')
    // this.draw()
    this.ctx.fillStyle = 'rgb(200, 0, 0)'
    this.ctx.fillRect(this.x, this.y, this.height, this.width)

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    this.ctx.fillRect(30, 30, 50, 50)

    // this.ctx.font = '48px serif'
    // this.ctx.fillText('Hello world', 10, 50)
  }
  // methods: {
  //   draw() {
  //     this.clear()
  //     // redraw each shape in the shapes[] array
  //     for (var i = 0; i < this.shapes.length; i++) {
  //       // decide if the shape is a rect or circle
  //       // (it's a rect if it has a width property)
  //       if (this.shapes[i].width) {
  //         rect(this.shapes[i])
  //       } else {
  //         circle(this.shapes[i])
  //       }
  //     }
  //   },
  //   clear() {
  //     this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
  //   }
  // }
}

// drag related variables
// var dragok = false
// var startX
// var startY

// handle mousedown events
// function myDown(e) {
//   // tell the browser we're handling this mouse event
//   e.preventDefault()
//   e.stopPropagation()

//   // get the current mouse position
//   var mx = parseInt(e.clientX - offsetX)
//   var my = parseInt(e.clientY - offsetY)

//   // test each shape to see if mouse is inside
//   dragok = false
//   for (var i = 0; i < shapes.length; i++) {
//     var s = shapes[i]
//     // decide if the shape is a rect or circle
//     if (s.width) {
//       // test if the mouse is inside this rect
//       if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
//         // if yes, set that rects isDragging=true
//         dragok = true
//         s.isDragging = true
//       }
//     } else {
//       var dx = s.x - mx
//       var dy = s.y - my
//       // test if the mouse is inside this circle
//       if (dx * dx + dy * dy < s.r * s.r) {
//         dragok = true
//         s.isDragging = true
//       }
//     }
//   }
//   // save the current mouse position
//   startX = mx
//   startY = my
// }

// // handle mouseup events
// function myUp(e) {
//   // tell the browser we're handling this mouse event
//   e.preventDefault()
//   e.stopPropagation()

//   // clear all the dragging flags
//   dragok = false
//   for (var i = 0; i < shapes.length; i++) {
//     shapes[i].isDragging = false
//   }
// }

// // handle mouse moves
// function myMove(e) {
//   // if we're dragging anything...
//   if (dragok) {
//     // tell the browser we're handling this mouse event
//     e.preventDefault()
//     e.stopPropagation()

//     // get the current mouse position
//     var mx = parseInt(e.clientX - offsetX)
//     var my = parseInt(e.clientY - offsetY)

//     // calculate the distance the mouse has moved
//     // since the last mousemove
//     var dx = mx - startX
//     var dy = my - startY

//     // move each rect that isDragging
//     // by the distance the mouse has moved
//     // since the last mousemove
//     for (var i = 0; i < shapes.length; i++) {
//       var s = shapes[i]
//       if (s.isDragging) {
//         s.x += dx
//         s.y += dy
//       }
//     }

//     // redraw the scene with the new rect positions
//     draw()

//     // reset the starting mouse position for the next mousemove
//     startX = mx
//     startY = my
//   }
// }
//
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  border: 1px solid black;
  /* width: 100%; */
  /* height: 150px;
  background-color: white;  */
}

.controls {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(10, 10, 10);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}
</style>
