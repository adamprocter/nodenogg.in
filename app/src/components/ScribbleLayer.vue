<template>
  <div class="scribble">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
//FIXME: touch / mouse is not under cursor
var ongoingTouches = []

export default {
  name: 'ScribbleLayer',

  props: {
    drawready: Boolean,
  },

  data() {
    return {
      painting: this.drawready,
      canvas: null,
      ctx: null,
    }
  },

  methods: {
    // startPainting(e) {
    //   this.painting = this.drawready
    //   if (this.painting == true) {
    //     // console.log(this.painting)
    //     this.draw(e)
    //   }
    // },
    // finishedPainting() {
    //   this.painting = false
    //   //  console.log(this.painting)
    //   this.ctx.beginPath()
    // },
    // draw(e) {
    //   if (!this.painting) return

    //   this.ctx.lineWidth = 6
    //   this.ctx.lineCap = 'round'

    //   this.ctx.lineTo(e.clientX, e.clientY)
    //   this.ctx.stroke()

    //   this.ctx.beginPath()
    //   this.ctx.moveTo(e.clientX, e.clientY)
    // },

    // touch methods

    handleStart(evt) {
      this.painting = this.drawready
      // console.log(this.painting)
      if (this.painting == true) {
        evt.preventDefault()
        console.log('touchstart.')
        var el = document.getElementById('canvas')
        var ctx = el.getContext('2d')
        var touches = evt.changedTouches

        for (var i = 0; i < touches.length; i++) {
          //console.log('touchstart:' + i + '...')
          ongoingTouches.push(this.copyTouch(touches[i]))
          var color = this.colorForTouch(touches[i])
          ctx.beginPath()
          ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false) // a circle at the start
          ctx.fillStyle = color
          ctx.fill()
          // console.log('touchstart:' + i + '.')
        }
      }
    },

    handleMove(evt) {
      evt.preventDefault()
      var el = document.getElementById('canvas')
      var ctx = el.getContext('2d')
      var touches = evt.changedTouches
      if (this.painting == true) {
        for (var i = 0; i < touches.length; i++) {
          var color = this.colorForTouch(touches[i])
          var idx = this.ongoingTouchIndexById(touches[i].identifier)

          if (idx >= 0) {
            // console.log('continuing touch ' + idx)
            ctx.beginPath()
            // console.log(
            //   'ctx.moveTo(' +
            //     ongoingTouches[idx].pageX +
            //     ', ' +
            //     ongoingTouches[idx].pageY +
            //     ');'
            // )
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY)
            // console.log(
            //   'ctx.lineTo(' + touches[i].pageX + ', ' + touches[i].pageY + ');'
            // )
            ctx.lineTo(touches[i].pageX, touches[i].pageY)
            ctx.lineWidth = 4
            ctx.strokeStyle = color
            ctx.stroke()

            ongoingTouches.splice(idx, 1, this.copyTouch(touches[i])) // swap in the new touch record
            //  console.log('.')
          } else {
            // console.log("can't figure out which touch to continue")
          }
        }
      }
    },
    handleEnd(evt) {
      evt.preventDefault()
      // log('touchend')
      var el = document.getElementById('canvas')
      var ctx = el.getContext('2d')
      var touches = evt.changedTouches

      for (var i = 0; i < touches.length; i++) {
        var color = this.colorForTouch(touches[i])
        var idx = this.ongoingTouchIndexById(touches[i].identifier)

        if (idx >= 0) {
          ctx.lineWidth = 4
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY)
          ctx.lineTo(touches[i].pageX, touches[i].pageY)
          ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8) // and a square at the end
          ongoingTouches.splice(idx, 1) // remove it; we're done
        } else {
          // console.log("can't figure out which touch to end")
        }
      }
    },

    handleCancel(evt) {
      evt.preventDefault()

      //  console.log('touchcancel.')
      var touches = evt.changedTouches

      for (var i = 0; i < touches.length; i++) {
        var idx = this.ongoingTouchIndexById(touches[i].identifier)
        ongoingTouches.splice(idx, 1) // remove it; we're done
      }
    },
    colorForTouch(touch) {
      var r = touch.identifier % 16
      var g = Math.floor(touch.identifier / 3) % 16
      var b = Math.floor(touch.identifier / 7) % 16
      r = r.toString(16) // make it a hex digit
      g = g.toString(16) // make it a hex digit
      b = b.toString(16) // make it a hex digit
      var color = '#' + r + g + b
      // console.log(
      //   'color for touch with identifier ' + touch.identifier + ' = ' + color
      // )
      return color
    },

    copyTouch({ identifier, pageX, pageY }) {
      return { identifier, pageX, pageY }
    },
    ongoingTouchIndexById(idToFind) {
      for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier

        if (id == idToFind) {
          return i
        }
      }
      return -1 // not found
    },
  },

  mounted() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Resize canvas
    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth

    this.canvas.addEventListener('touchstart', this.handleStart, false)
    this.canvas.addEventListener('touchend', this.handleEnd, false)
    this.canvas.addEventListener('touchcancel', this.handleCancel, false)
    this.canvas.addEventListener('touchmove', this.handleMove, false)
  },
}
</script>

<style lang="css" scoped></style>
