<template>
  <div
    v-if="mode == 'move'"
    ref="container"
    class="outer"
    v-on:wheel.capture="onWheel"
    v-on:touchstart.passive="onTouchStart"
    v-on:mousedown="onMouseDown"
    v-on:touchmove="onTouchMove"
    v-on:mousemove="onMouseMove"
    v-on:touchend.passive.capture="onTouchEnd"
    v-on:mouseup.passive.capture="onMouseUp"
    v-on:click.capture="handleEventCapture"
    v-on:touchend.capture="handleEventCapture"
  >
    <div
      ref="innerContainer"
      v-bind:class="{ inner: true, active: true }"
      v-bind:style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`,
      }"
    >
      <!-- {{ JSON.stringify(interaction) }} -->
      <!-- view paramaters not being utilised ? -->
      <!-- {{ mode }} -->
      <slot />
    </div>
  </div>

  <div v-else ref="container" class="outer">
    <!-- <div
      ref="innerContainer"
      v-bind:class="{ inner: true, active: true }"
      v-bind:style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`,
      }"
    > -->

    <div
      ref="innerContainer"
      v-bind:class="{ inner: true, active: true }"
      v-bind:style="{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`,
      }"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { constrainTranslation } from '@/experimental/utils/numbers'
import {
  getNormalisedInteraction,
  changeViewFromWheelEvent,
  changeViewFromMultiTouchEvent,
} from '@/experimental/utils/view'

export default {
  name: 'map-interaction',
  data() {
    return {
      shouldPreventTouchEndDefault: false,
    }
  },
  computed: {
    ...mapState({
      interaction: (state) => state.ui.interaction,
      mode: (state) => state.ui.mode,
    }),
  },
  props: {
    translationBounds: {
      type: Object,
      default() {
        return { xMin: -500, xMax: 500, yMin: -500, yMax: 500 }
      },
    },
    translation: Object,
    scale: Number,
    width: Number,
    height: Number,
    minScale: {
      type: Number,
      default: 0.3,
    },
    maxScale: {
      type: Number,
      default: 2.0,
    },
  },
  methods: {
    handleEventCapture(e) {
      if (this.shouldPreventTouchEndDefault) {
        e.preventDefault()
        this.shouldPreventTouchEndDefault = false
      }

      const { relativePoint, boardPoint } = getNormalisedInteraction(
        this.$refs.container,
        e,
        this.translation,
        this.scale
      )
      console.log(relativePoint, boardPoint)
    },
    reset() {},
    onMouseDown(e) {
      e.preventDefault()
      this.setPointerState([e])
    },
    onMouseMove(e) {
      if (!this.interaction.origin) {
        return
      }
      e.preventDefault()
      this.handleDrag(e)
    },
    onMouseUp() {
      this.setPointerState([])
    },
    onTouchStart(e) {
      e.preventDefault()
      this.setPointerState(e.touches)
    },
    onTouchMove(e) {
      if (!this.interaction.origin) {
        return
      }
      // console.log('touch')
      e.preventDefault()
      const isPinchAction =
        e.touches.length == 2 && this.interaction.origin.points.length > 1

      if (isPinchAction) {
        this.handleMultiTouch(e)
      } else if (e.touches.length === 1 && this.interaction.origin) {
        this.handleDrag(e.touches[0])
      }
    },
    onTouchEnd(e) {
      this.setPointerState(e.touches)
    },
    onWheel(e) {
      e.preventDefault()
      e.stopPropagation()

      //  // console.log(e)

      this.handleWheel(e)
    },

    handleDrag(pointer) {
      const { translation, points } = this.interaction.origin
      const startPointer = points[0]
      const dragX = pointer.clientX - startPointer.clientX
      const dragY = pointer.clientY - startPointer.clientY
      const newTranslation = {
        x: translation.x + dragX,
        y: translation.y + dragY,
      }

      //// console.log(dragX, dragY)

      this.$store.commit(
        'ui/setTranslation',
        constrainTranslation(newTranslation, this.translationBounds)
      )
      this.shouldPreventTouchEndDefault = true
    },
    setPointerState(points) {
      if (!points || points.length === 0) {
        this.$store.commit('ui/resetOrigin')
        return
      }

      this.$store.commit('ui/setOrigin', {
        points,
        scale: this.scale,
        translation: this.translation,
      })
    },
    handleWheel(e) {
      const [newScale, newTranslation] = changeViewFromWheelEvent(
        e,
        this.$refs.container,
        this
      )
      this.$store.commit('ui/setScale', newScale)
      this.$store.commit(
        'ui/setTranslation',
        constrainTranslation(newTranslation, this.translationBounds)
      )
    },
    handleMultiTouch(e) {
      const [newTranslation, newScale] = changeViewFromMultiTouchEvent(
        this.interaction.origin.points,
        e.touches,
        this.$refs.container,
        this
      )
      this.$store.commit('ui/setScale', newScale)
      this.$store.commit(
        'ui/setTranslation',
        constrainTranslation(newTranslation, this.translationBounds)
      )
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  /* border: 1px solid rgba(0, 0, 0, 0.25); */
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
