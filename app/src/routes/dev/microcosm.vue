<template>
  <div v-if="loading">loading</div>
  <ViewSerializer
    v-else
    v-bind:view="view"
    v-bind:microcosm_id="microcosm_id"
    v-bind:node_id="node_id"
  />
</template>

<script>
import microcosmState from './microcosm.mixin'
import ViewSerializer from '@/views'

export default {
  mixins: [microcosmState],
  components: {
    ViewSerializer,
  },
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>
