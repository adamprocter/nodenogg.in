<template>
  <div v-if="!!activeMicrocosmHistory" class="microcosm-settings">
    {{ activeMicrocosmHistory }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      activeMicrocosmHistory: 'microcosms/getMicrocosmHistoryFromRoute',
    }),
  },
}
</script>

<style scoped>
.microcosm-settings {
  position: fixed;
  top: 0;
  right: 0;
  font-size: 10px;
  font-weight: bold;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-width: 200px;
  max-height: 60px;
  overflow: scroll;
  font-family: monospace;
}
</style>
