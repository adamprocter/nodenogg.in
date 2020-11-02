<template>
  <div id="listwrapper">
    <div v-if="clientset">
      <h1 class="mobile">All nodes - card view</h1>

      <div class="grid">
        <CardsLayer
          @editTrue="(e) => editTrue(e)"
          v-for="value in myNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
          v-bind:deleted="value.deleted"
        />

        <OtherCardslayer
          v-for="value in otherNodes"
          v-bind:key="value.node_id"
          v-bind:nodeid="value.node_id"
          v-bind:nodetext="value.node_text"
          v-bind:deleted="value.deleted"
        />
      </div>

      <div class="btn-row" @click="addNode()">
        <!-- <BaseButton class="new" buttonClass="action" @click="addNode()"
            >Create Node</BaseButton
          > -->

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          viewBox="0 0 143 106"
          class="icon"
        >
          <g transform="translate(-1345 -843)">
            <g class="a" transform="translate(1345 865)">
              <rect class="d" width="127" height="84" />
              <rect class="e" x="0.5" y="0.5" width="126" height="83" />
            </g>
            <g class="b" transform="translate(1361 843)">
              <rect class="d" width="127" height="84" />
              <rect class="e" x="3.5" y="3.5" width="120" height="77" />
            </g>
            <line class="c" x2="41" transform="translate(1406.5 884.5)" />
            <line class="c" y2="41" transform="translate(1426.5 863.5)" />
          </g>
        </svg>
      </div>
    </div>

    <div v-else>
      <OnBoard @clientAdded="clientAdded()" @editTrue="(e) => editTrue(e)" />
    </div>
  </div>
</template>

<script>
import CardsLayer from '@/components/CardsLayer'
import OtherCardslayer from '@/components/OtherCardslayer'
import OnBoard from '@/components/OnBoard'

import { mapState } from 'vuex'

import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'

export default {
  name: 'List',

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
      otherNodes: (state) => state.otherNodes,
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

  mounted() {
    var e = false
    this.$store.dispatch('shortcutState', e)
  },

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
    CardsLayer,
    OtherCardslayer,

    OnBoard,
  },
}
</script>

<style lang="css" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;

}

.mobile {
  margin-left: 1em;
  font-size: 1em;
}
.new {
  margin-bottom: 1em;
}

.example {
  width: 30px;
}

.icon {
  margin-left: 1em;
  padding: 0.5em;
  cursor: pointer;
}

.a {
  fill: #333;
  stroke: #707070;
}
.b {
  fill: #fff;
}
.b,
.c {
  stroke: #333;
  stroke-width: 7px;
}
.c,
.e {
  fill: none;
}
.d {
  stroke: none;
}
</style>
