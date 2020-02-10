<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- <canvas ref="canvas" :width="windowWidth" :height="windowHeight"></canvas> -->
    <canvas ref="canvas"></canvas>

    <div class="controls">
      <!-- <div class="btn-row">
        <button on:click="popups.showPane = !popups.showPane">Button</button>
      </div>

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
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d')
    this.ctx.width = window.innerWidth
    this.ctx.height = window.innerHeight - 60
    this.ctx.fillStyle = '#777'
    this.ctx.fillRect(10, 20, 100, 100)
    this.ctx.fillRect(170, 20, 100, 100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: white;
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
