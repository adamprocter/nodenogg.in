<template>
  <div>
    <div v-if="clientset">
      <div id="listwrapper">
        <h1 class="mobile">Your nodes - collect</h1>
        <ListLayer
          @editTrue="(e) => editTrue(e)"
          v-for="value in myNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
          v-bind:deleted="value.deleted"
        />
        <!-- <div class="btn-row">
          <BaseButton class="new" buttonClass="action" @click="addNode()"
            >Create Node</BaseButton
          >
        </div> -->
      </div>
    </div>
    <div v-else>
      <OnBoard @clientAdded="clientAdded()" @editTrue="(e) => editTrue(e)" />
    </div>
  </div>
</template>

<script>
import ListLayer from '@/components/ListLayer'
import OnBoard from '@/components/OnBoard'

import { mapState } from 'vuex'

//import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'

export default {
  name: 'List',

  //mixins: [shortcutsMixin],
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
      //otherNodes: (state) => state.otherNodes,
      // shortcutstate: (state) => state.shortcutstate,
      // toolmode: (state) => state.ui.mode,
    }),
  },

  // created() {
  //   if (typeof window !== 'undefined') {
  //     document.addEventListener('keydown', this.handleKeyPress)
  //   }
  // },

  // beforeDestroy() {
  //   if (typeof window !== 'undefined') {
  //     document.removeEventListener('keydown', this.handleKeyPress)
  //   }
  // },

  methods: {
    clientAdded() {
      this.clientset = !this.clientset
    },

    addNode() {
      this.$store.dispatch('addNode')
    },

    editTrue(e) {
      this.$store.dispatch('shortcutState', e)
    },
  },
  components: {
    ListLayer,
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
</style>
