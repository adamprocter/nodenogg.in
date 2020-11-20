<template>
  <div id="listwrapper">
    <div v-if="clientset">
      <h1 class="mobile">dicarded nodes - list view</h1>

      <DiscardLayer
        v-for="value in myNodes"
        v-bind:key="value.node_id"
        v-bind:nodeid="value.node_id"
        v-bind:nodetext="value.node_text"
        v-bind:deleted="value.deleted"
      />
    </div>

    <div v-else>
      <OnBoard @client-added="clientAdded()" @edit-true="(e) => editTrue(e)" />
    </div>
  </div>
</template>

<script>
import DiscardLayer from '@/components/DiscardLayer'
import OnBoard from '@/components/OnBoard'

import { mapState } from 'vuex'

import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'

export default {
  name: 'Discarded',

  mixins: [shortcutsMixin],
  data: function () {
    return {
      clientset: false,
    }
  },

  props: {
    nodeid: String,
    nodetext: String,
    deleted: Boolean,
  },

  computed: {
    ...mapState({
      myNodes: (state) => state.myNodes,

      shortcutstate: (state) => state.shortcutstate,
      toolmode: (state) => state.ui.mode,
    }),
  },

  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyPress)
    }
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  },

  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },

    editTrue(e) {
      this.$store.dispatch('shortcutState', e)
    },
  },
  components: {
    DiscardLayer,
    OnBoard,
  },
}
</script>

<style lang="css" scoped>
.mobile {
  margin-left: 1em;
  font-size: 1em;
}
.new {
  margin-bottom: 1em;
}
.mobile {
  font-size: 1em;
}
.new {
  margin-bottom: 1em;
}
</style>
