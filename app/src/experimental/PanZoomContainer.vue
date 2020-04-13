<style scoped>
.outer {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgb(245, 245, 245);
}
.inner {
  width: 2000px;
  height: 2000px;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  background-size: 40px 40px;
  background-color: rgb(245, 245, 245);
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.5) 1px,
    rgba(0, 0, 0, 0) 1px
  );
}
.inner.active {
  touch-action: none;
  -ms-touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>

<template>
  <div
    ref="container"
    class="outer"
    v-on:wheel.capture="onWheel"
    v-on:touchstart.passive="onTouchStart"
    v-on:mousedown="onMouseDown"
    v-on:touchmove.passive="onTouchMove"
    v-on:mousemove="onMouseMove"
    v-on:touchend.passive.capture="onTouchEnd"
    v-on:mouseup.passive.capture="onMouseUp"
    v-on:click.capture="handleEventCapture"
    v-on:touchend.capture="handleEventCapture"
  >
    <div
      ref="innerContainer"
      v-bind:class="{ inner: true, active: pan }"
      v-bind:style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`
      }"
    >
      <slot />
    </div>
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
// import { mapRange } from '@/experimental/utils/numbers'
export default {
  name: 'map-interaction',
  data() {
    return {
      shouldPreventTouchEndDefault: false
    }
  },
  props: {
    translationBounds: {
      type: Object,
      default() {
        return { xMin: -500, xMax: 500, yMin: -500, yMax: 500 }
      }
    },
    translation: Object,
    scale: Number,
    width: Number,
    height: Number,
    pan: {
      type: Boolean,
      default: true
    },
    zoom: {
      type: Boolean,
      default: true
    },
    minScale: {
      type: Number,
      default: 0.3
    },
    maxScale: {
      type: Number,
      default: 2.0
    }
  },
  methods: {
    handleEventCapture(e) {
      if (this.shouldPreventTouchEndDefault) {
        e.preventDefault()
        this.shouldPreventTouchEndDefault = false
      }

      const rect = this.$refs.container.getBoundingClientRect()

      const x = e.clientX - parseInt(rect.left, 10)
      const y = e.clientY - parseInt(rect.top, 10)

      const result = {
        relative: { x, y },
        canvas: {
          x: parseInt((x + -this.translation.x) / this.scale, 10),
          y: parseInt((y + -this.translation.y) / this.scale, 10)
        }
      }
      console.log(result)
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
      if (!this.startPointerInfo || !this.pan) {
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
      const isPinchAction =
        e.touches.length == 2 && this.startPointerInfo.pointers.length > 1

      if (isPinchAction && this.zoom) {
        this.scaleFromMultiTouch(e)
      } else if (e.touches.length === 1 && this.startPointerInfo && this.pan) {
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

      this.$store.commit(
        'ui/setTranslation',
        this.clampTranslation(newTranslation)
      )
      this.shouldPreventTouchEndDefault = true
    },
    onWheel(e) {
      if (!this.zoom) {
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
      const clientOffset = this.$refs.container.getBoundingClientRect()
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
      this.$store.commit('ui/setScale', newScale)

      this.$store.commit(
        'ui/setTranslation',
        this.clampTranslation(newTranslation)
      )
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

      this.$store.commit('ui/setScale', newScale)

      this.$store.commit(
        'ui/setTranslation',
        this.clampTranslation(newTranslation)
      )
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
      const rect = this.$refs.container.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const focalPoint = this.clientPosToTranslatedPos({
        x,
        y
      })
      this.scaleFromPoint(scale, focalPoint)
    }
  },
  mounted() {
    this.containerNode = this.$refs.container
  },
  created() {
    this.startPointerInfo = undefined
  }
}
</script>
