<template>
  <div
    class="pixi-renderer"
    v-bind:style="{ width: `${width}px`, height: `${height}px` }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { Application, Container, Graphics } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import Cull from 'pixi-cull'
export default {
  props: {
    height: Number,
    width: Number,
    autoResize: Boolean,
    backgroundColor: Number,
    clearBeforeRender: Boolean,
    preserveDrawingBuffer: Boolean,
    resolution: Number,
    roundPixels: Boolean,
    transparent: Boolean,
  },
  data() {
    let options = { width: this.width, height: this.height }
    if (this.autoResize) options.autoResize = this.autoResize
    if (this.backgroundColor) options.backgroundColor = this.backgroundColor
    if (this.clearBeforeRender) {
      options.clearBeforeRender = this.clearBeforeRender
    }
    if (this.preserveDrawingBuffer) {
      options.preserveDrawingBuffer = this.preserveDrawingBuffer
    }
    if (this.resolution) options.resolution = this.resolution
    if (this.roundPixels) options.roundPixels = this.roundPixels
    if (this.transparent) options.transparent = this.transparent

    const app = new Application(options)

    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      interaction: app.renderer.plugins.interaction,
    })

    this._selectionContainer = new Container({
      interactive: false,
      interactiveChildren: false,
    })
    this._selectionGraphics = new Graphics()
    this._selectionContainer.addChild(this._selectionGraphics)

    this._connectionsContainer = new Container({
      interactive: false,
      interactiveChildren: false,
    })
    this._connectionGraphics = new Graphics()
    this._connectionsContainer.addChild(this._connectionGraphics)

    viewport.addChild(this._connectionsContainer)

    app.stage.addChild(viewport)
    app.stage.addChild(this._selectionContainer)
    this._selectionContainer.alpha = 0.25

    app.view.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    viewport.on('click', this.handleClick)
    viewport.on('rightclick', this.handleRightClick)

    this.renderSelection()
    this.renderConnections()

    viewport
      .drag({ keyToPress: ['Space'] })
      .pinch()
      .wheel()
      .decelerate()

    const cull = new Cull.Simple()
    // cull.addList(viewport.children);
    // cull.cull(viewport.getVisibleBounds());

    return {
      app,
      viewport,
      cull,
      pixiObjects: {},
    }
  },
  provide() {
    return {
      app: this.app,
      viewport: this.viewport,
      pixiObjects: this.pixiObjects,
    }
  },
  computed: {
    stage() {
      return this.app.stage
    },
    instance() {
      return this.viewport
    },
    renderer() {
      return this.app.renderer
    },
  },
  methods: {
    filterEvents(event, callback) {
      if (event.target === this.viewport) {
        callback()
      }
    },
    handleClick(event) {
      this.filterEvents(event, () => {
        this.$emit('click')
      })
    },
    handleRightClick(event) {
      this.filterEvents(event, () => {
        this.$emit('rightClick')
      })
    },
    renderSelection() {
      this._selectionGraphics.beginFill(0x0066ff, 1.0)
      this._selectionGraphics.drawRect(0, 0, 300, 200)
    },
    renderConnections() {
      this._connectionGraphics.lineStyle(5, 0xaa0000, 1)
      this._connectionGraphics.bezierCurveTo(100, 200, 200, 200, 240, 100)

      this._connectionGraphics.position.x = 50
      this._connectionGraphics.position.y = 50
    },
  },
  mounted() {
    this.$el.appendChild(this.app.view)
    this.app.ticker.add((delta) => this.$emit('tick', delta))
    // this.app.ticker.add(() => {
    //   if (this.viewport.dirty) {
    //     // console.log(this.viewport.dirty)
    //     console.log(this.viewport.dirty);
    //     this.cull.cull(this.viewport.getVisibleBounds());
    //     this.viewport.dirty = false;
    //   }
    // });
  },
  watch: {
    autoResize: function (autoResize) {
      this.renderer.autoResize = autoResize
    },
    backgroundColor: function (backgroundColor) {
      this.renderer.backgroundColor = backgroundColor
    },
    clearBeforeRender: function (clearBeforeRender) {
      this.renderer.clearBeforeRender = clearBeforeRender
    },
    preserveDrawingBuffer: function (preserveDrawingBuffer) {
      this.renderer.preserveDrawingBuffer = preserveDrawingBuffer
    },
    resolution: function (resolution) {
      this.renderer.resolution = resolution
    },
    roundPixels: function (roundPixels) {
      this.renderer.roundPixels = roundPixels
    },
    transparent: function (transparent) {
      this.renderer.transparent = transparent
    },
    height: function (height) {
      this.renderer.resize(this.width, height)
    },
    width: function (width) {
      this.renderer.resize(width, this.height)
    },
  },
}
</script>

<style>
.pixi-renderer {
  display: inline-block;
  line-height: 0;
}

.pixi-renderer > canvas {
  max-width: 100%;
  max-height: 100%;
}

.pixi-renderer div {
  display: none;
}
</style>
