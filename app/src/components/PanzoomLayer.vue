<template>
  <div>
    <panZoom>
      <p>hello</p>
      <img src="https://unsplash.com/photos/wl8EzLeEya4" />

      <!-- <slot /> -->
    </panZoom>
  </div>
</template>
<script>
// import vue-panzoom
import panZoom from 'vue-panzoom'
export default {
  props: {
    options: { type: Object, default: () => {} },
  },
  mounted() {
    this.panzoom = Panzoom(document.getElementById('panzoom-element'), {
      maxScale: 5,
    })
  },
  methods: {
    zoom(level) {
      level === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn()
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
