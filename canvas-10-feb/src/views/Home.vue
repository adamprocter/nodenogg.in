<template>
  <div class="home">
    <NodesLayer />
    <CanvasLayer />
    <ControlsLayer />
  </div>
</template>

<script>
// @ is an alias to /src
import CanvasLayer from '@/components/CanvasLayer.vue'
import NodesLayer from '@/components/NodesLayer.vue'
import ControlsLayer from '@/components/ControlsLayer.vue'

export default {
  name: 'Home',
  components: {
    CanvasLayer,
    NodesLayer,
    ControlsLayer
  }
}
</script>

<style scoped></style>
