<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <canvas ref="canvas"></canvas>

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
var canvas = null

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      configRect: {
        x: -25,
        y: -25,
        height: 50,
        width: 50,
        fill: 'rgb(200, 0, 0)'
      },
      configHandle: {
        x: 25,
        y: 25,
        height: 4,
        width: 4,
        fill: 'black'
      }
    }
  },
  mounted() {
    canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
    this.draw()
  },
  methods: {
    draw() {
      this.box(this.ctx, this.x, this.y)
      console.log('draw')
    },

    box(ctx, x, y) {
      ctx.setTransform(1, 0, 0, 1, x, y)

      ctx.fillStyle = this.configRect.fill
      ctx.fillRect(
        this.configRect.x,
        this.configRect.y,
        this.configRect.height,
        this.configRect.width
      )

      ctx.fillStyle = this.configHandle.fill
      ctx.fillRect(
        this.configHandle.x,
        this.configHandle.y,
        this.configHandle.height,
        this.configHandle.width
      )

      ctx.stroke()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    },

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
