<template>
  <svg
    v-bind:width="size"
    v-bind:height="size"
    v-bind:class="theme"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <component v-if="hasComponent" v-bind:is="iconComponent" />
  </svg>
</template>

<script>
import * as iconLibrary from '@/experimental/icons/library'

export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 40
    },
    theme: {
      type: String,
      default: 'light'
    },
    type: String
  },

  computed: {
    style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    hasComponent() {
      return !!iconLibrary[this.type]
    },
    iconComponent() {
      return iconLibrary[this.type]
    }
  }
}
</script>

<style scoped>
svg {
  width: 40px;
  height: 40px;
}

svg > * {
  fill: black;
}
svg.light > * {
  fill: white;
}
</style>
