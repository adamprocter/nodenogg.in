<style scoped>
.outer {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  touch-action: none;
  -ms-touch-action: none;
  cursor: all-scroll;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  border: 5px solid red;
}
.inner {
  width: 2000px;
  height: 2000px;
  position: relative;
  transform-origin: 0 0;
  background-size: 40px 40px;
  background-color: rgb(245, 245, 245);
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.5) 1px,
    rgba(0, 0, 0, 0) 1px
  );
}
.indicator {
  position: absolute;
  z-index: 4;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: white;
  padding: 10px;
  border-radius: 3px;
  background: rgb(50, 50, 50);
}
</style>

<template>
  <div
    ref="vueref0"
    class="outer"
    v-bind:style="containerStyle"
    v-on:click.capture="
      {
        handleEventCapture
      }
    "
    v-on:touchend.capture="
      {
        handleEventCapture
      }
    "
  >
    <div
      class="inner"
      v-bind:style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`
      }"
    >
      <slot></slot>
    </div>
    <div class="indicator">{{ scalePercentage }}</div>
  </div>
</template>
<script>
import {
  clamp,
  midpoint,
  touchPt,
  touchDistance,
  coordChange
} from './geometry'
// import makePassiveEventOption from './makePassiveEventOption'

export default {
  name: 'map-interaction',
  data() {
    const {
      scale,
      defaultScale,
      translation,
      defaultTranslation,
      minScale,
      maxScale
    } = this

    let desiredScale
    if (scale != undefined) {
      desiredScale = scale
    } else if (defaultScale != undefined) {
      desiredScale = defaultScale
    } else {
      desiredScale = 1
    }

    return {
      containerStyle: {
        height: '100%',
        width: '100%',
        position: 'relative',
        touchAction: 'none'
      },
      scale: clamp(minScale, desiredScale, maxScale),
      translation: translation || defaultTranslation || { x: 0, y: 0 },
      shouldPreventTouchEndDefault: false,
      x: 0,
      y: 0
    }
  },
  props: {
    defaultScale: Number,
    defaultTranslation: Object,
    disableZoom: Boolean,
    disablePan: Boolean,
    onChange: Function,
    translationBounds: {
      type: Object,
      default() {
        return { xMin: -500, xMax: 500, yMin: -500, yMax: 500 }
      }
    },
    width: Number,
    height: Number,
    minScale: {
      type: Number,
      default: 0.3
    },
    maxScale: {
      type: Number,
      default: 2.0
    }
  },
  computed: {
    scalePercentage() {
      return `${(this.scale * 100).toFixed(0)}%`
    }
  },
  methods: {
    handleEventCapture(e) {
      if (this.shouldPreventTouchEndDefault) {
        e.preventDefault()
        this.shouldPreventTouchEndDefault = false
      }
    },
    defaultProps() {
      return {
        minScale: 0.05,
        maxScale: 3,
        translationBounds: {},
        disableZoom: false,
        disablePan: false
      }
    },
    updateParent() {
      if (!this.onChange) {
        return
      }

      const { scale, translation } = this
      this.onChange({
        scale,
        translation
      })
    },
    onMouseDown(e) {
      e.preventDefault()
      this.setPointerState([e])
    },
    onTouchStart(e) {
      e.preventDefault()
      this.setPointerState(e.touches)
    },
    onMouseUp() {
      this.setPointerState([])
    },
    onTouchEnd(e) {
      this.setPointerState(e.touches)
    },
    onMouseMove(e) {
      if (!this.startPointerInfo || this.disablePan) {
        return
      }

      e.preventDefault()
      this.onDrag(e)
    },
    onTouchMove(e) {
      if (!this.startPointerInfo) {
        return
      }

      e.preventDefault()
      const { disablePan, disableZoom } = this
      const isPinchAction =
        e.touches.length == 2 && this.startPointerInfo.pointers.length > 1

      if (isPinchAction && !disableZoom) {
        this.scaleFromMultiTouch(e)
      } else if (
        e.touches.length === 1 &&
        this.startPointerInfo &&
        !disablePan
      ) {
        this.onDrag(e.touches[0])
      }
    },
    onDrag(pointer) {
      const { translation, pointers } = this.startPointerInfo
      const startPointer = pointers[0]
      const dragX = pointer.clientX - startPointer.clientX
      const dragY = pointer.clientY - startPointer.clientY
      const newTranslation = {
        x: translation.x + dragX,
        y: translation.y + dragY
      }
      this.translation = this.clampTranslation(newTranslation)
      this.shouldPreventTouchEndDefault = true
      this.$nextTick(() => this.updateParent())
    },
    onWheel(e) {
      if (this.disableZoom) {
        return
      }

      e.preventDefault()
      e.stopPropagation()
      const scaleChange = 2 ** (e.deltaY * 0.002)
      const newScale = clamp(
        this.minScale,
        this.scale + (1 - scaleChange),
        this.maxScale
      )
      const mousePos = this.clientPosToTranslatedPos({
        x: e.clientX,
        y: e.clientY
      })
      this.scaleFromPoint(newScale, mousePos)
    },
    setPointerState(pointers) {
      if (!pointers || pointers.length === 0) {
        this.startPointerInfo = undefined
        return
      }

      this.startPointerInfo = {
        pointers,
        scale: this.scale,
        translation: this.translation
      }
    },
    clampTranslation(desiredTranslation = this) {
      const { x, y } = desiredTranslation
      let { xMax, xMin, yMax, yMin } = this.translationBounds
      xMin = xMin != undefined ? xMin : -Infinity
      yMin = yMin != undefined ? yMin : -Infinity
      xMax = xMax != undefined ? xMax : Infinity
      yMax = yMax != undefined ? yMax : Infinity
      return {
        x: clamp(xMin, x, xMax),
        y: clamp(yMin, y, yMax)
      }
    },
    translatedOrigin(translation = this.translation) {
      const clientOffset = this.getContainerNode().getBoundingClientRect()
      return {
        x: clientOffset.left + translation.x,
        y: clientOffset.top + translation.y
      }
    },
    clientPosToTranslatedPos({ x, y }, translation = this.translation) {
      const origin = this.translatedOrigin(translation)
      return {
        x: x - origin.x,
        y: y - origin.y
      }
    },
    scaleFromPoint(newScale, focalPt) {
      const { translation, scale } = this
      const scaleRatio = newScale / (scale != 0 ? scale : 1)
      const focalPtDelta = {
        x: coordChange(focalPt.x, scaleRatio),
        y: coordChange(focalPt.y, scaleRatio)
      }
      const newTranslation = {
        x: translation.x - focalPtDelta.x,
        y: translation.y - focalPtDelta.y
      }
      this.scale = newScale
      this.translation = this.clampTranslation(newTranslation)
      this.$nextTick(() => this.updateParent())
    },
    scaleFromMultiTouch(e) {
      const startTouches = this.startPointerInfo.pointers
      const newTouches = e.touches
      // calculate new scale
      const dist0 = touchDistance(startTouches[0], startTouches[1])
      const dist1 = touchDistance(newTouches[0], newTouches[1])
      const scaleChange = dist1 / dist0
      const startScale = this.startPointerInfo.scale
      const targetScale = startScale + (scaleChange - 1) * startScale
      const newScale = clamp(this.minScale, targetScale, this.maxScale)
      // calculate mid points
      const newMidPoint = midpoint(
        touchPt(newTouches[0]),
        touchPt(newTouches[1])
      )
      const startMidpoint = midpoint(
        touchPt(startTouches[0]),
        touchPt(startTouches[1])
      )
      const dragDelta = {
        x: newMidPoint.x - startMidpoint.x,
        y: newMidPoint.y - startMidpoint.y
      }
      const scaleRatio = newScale / startScale
      const focalPt = this.clientPosToTranslatedPos(
        startMidpoint,
        this.startPointerInfo.translation
      )
      const focalPtDelta = {
        x: coordChange(focalPt.x, scaleRatio),
        y: coordChange(focalPt.y, scaleRatio)
      }
      const newTranslation = {
        x: this.startPointerInfo.translation.x - focalPtDelta.x + dragDelta.x,
        y: this.startPointerInfo.translation.y - focalPtDelta.y + dragDelta.y
      }
      this.scale = newScale
      this.translation = this.clampTranslation(newTranslation)
      this.$nextTick(() => this.updateParent())
    },
    discreteScaleStepSize() {
      const { minScale, maxScale } = this
      const delta = Math.abs(maxScale - minScale)
      return delta / 10
    },
    changeScale(delta) {
      const targetScale = this.scale + delta
      const { minScale, maxScale } = this
      const scale = clamp(minScale, targetScale, maxScale)
      const rect = this.getContainerNode().getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const focalPoint = this.clientPosToTranslatedPos({
        x,
        y
      })
      this.scaleFromPoint(scale, focalPoint)
    },
    getContainerNode() {
      return this.containerNode
    }
  },
  created() {
    this.startPointerInfo = undefined
  },
  mounted() {
    this.containerNode = this.$refs.vueref0
    // const passiveOption = makePassiveEventOption(false)
    const passiveOption = { passive: false }
    this.getContainerNode().addEventListener(
      'wheel',
      this.onWheel,
      passiveOption
    )

    /*
    Setup events for the gesture lifecycle: start, move, end touch
  */
    // start gesture
    this.getContainerNode().addEventListener(
      'touchstart',
      this.onTouchStart,
      passiveOption
    )
    this.getContainerNode().addEventListener(
      'mousedown',
      this.onMouseDown,
      passiveOption
    )
    // move gesture
    window.addEventListener('touchmove', this.onTouchMove, passiveOption)
    window.addEventListener('mousemove', this.onMouseMove, passiveOption)
    // end gesture
    const touchAndMouseEndOptions = {
      capture: true,
      ...passiveOption
    }
    window.addEventListener(
      'touchend',
      this.onTouchEnd,
      touchAndMouseEndOptions
    )
    window.addEventListener('mouseup', this.onMouseUp, touchAndMouseEndOptions)
  },
  destroyed() {
    this.getContainerNode().removeEventListener('wheel', this.onWheel)
    // Remove touch events
    this.getContainerNode().removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
    // Remove mouse events
    this.getContainerNode().removeEventListener('mousedown', this.onMouseDown)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  },
  updated() {
    this.containerNode = this.$refs.vueref0
  }
}
</script>
