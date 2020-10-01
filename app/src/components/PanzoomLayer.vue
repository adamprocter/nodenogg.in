<template>
  <div>
    <div v-if="mode == 'move'" style="overflow: hidden">
      <div id="panzoom-element">
        <slot />
      </div>
    </div>

    <div v-else>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Panzoom from '@panzoom/panzoom'
import { mapState } from 'vuex'

export default {
  props: {
    options: { type: Object, default: () => {} },
  },

  created() {},

  // FIX: ONLY FIRES ONCE
  mounted() {
    this.panzoom = Panzoom(document.getElementById('panzoom-element'))
    document.addEventListener('wheel', this.panzoom.zoomWithWheel)
    document.addEventListener('wheel', function (event) {
      if (!event.shiftKey) return
      this.panzoom.zoomWithWheel(event)
    })
  },
  computed: {
    ...mapState({
      mode: (state) => state.ui.mode,
    }),
  },
  methods: {},
}

// This demo binds to shift + wheel
</script>
