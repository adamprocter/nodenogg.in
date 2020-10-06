<template>
  <div>
    <div v-if="clientset">
      <div id="listwrapper">
        <h1 class="mobile">Your nodes - list mode</h1>

        <ListLayer
          @editTrue="(e) => editTrue(e)"
          v-for="value in myNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
          v-bind:deleted="value.deleted"
        />
        <div class="btn-row">
          <BaseButton class="new" buttonClass="action" @click="addNode()"
            >Create Node</BaseButton
          >
        </div>
      </div>
    </div>
    <div v-else>
      <OnBoard @clientAdded="clientAdded()" @editTrue="(e) => editTrue(e)" />
    </div>
  </div>
</template>

<script>
import Router from '@/router'
import ListLayer from '@/components/ListLayer'
import OnBoard from '@/components/OnBoard'
import { mapState } from 'vuex'
import marked from 'marked'
import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'

export default {
  name: 'List',

  mixins: [shortcutsMixin],
  data: function () {
    return {
      localmicrocosm: Router.currentRoute.params.microcosm,
      clientid: '',
      clientset: false,
      offline: false,
      name: false,
      microcosm: false,
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

  mounted() {},

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
  filters: {
    marked: marked,
  },
}
</script>

<style lang="css" scoped>
#listwrapper {
  margin-left: 1em;
  margin-bottom: 1em;
}
.mobile {
  font-size: 1em;
}
.new {
  margin-bottom: 1em;
}
</style>
