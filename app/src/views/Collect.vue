<template>
  <div>
    <div v-if="clientset">
      <div id="listwrapper">
        <ModesCard />
        <ListLayer @edit-true="(e) => editTrue(e)" :added="added" />
        <div class="btn-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            viewBox="0 0 143 106"
            class="icon"
            @click="addNode()"
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

          <BaseButton class="new" buttonClass="action" @click="uploadAdded()"
            >Upload</BaseButton
          >
          <BaseButton class="new" buttonClass="action" @click="copyDone()"
            >Get Upload</BaseButton
          >
        </div>
        <UploadLayer
          v-bind:uploadready="uploadready"
          v-bind:copyready="copyready"
          @upload-added="uploadAdded()"
          @copy-done="copyDone()"
        />
      </div>
    </div>
    <div v-else>
      <WelcomeList
        v-for="value in otherNodes"
        v-bind:key="value.node_id"
        v-bind:nodeid="value.node_id"
        v-bind:nodetext="value.node_text"
        v-bind:deleted="value.deleted"
      />
      <OnBoard @client-added="clientAdded()" @edit-true="(e) => editTrue(e)" />
    </div>
  </div>
</template>

<script>
import ListLayer from '@/components/ListLayer'
import ModesCard from '@/components/ModesCard'
import UploadLayer from '@/components/UploadLayer'
import OnBoard from '@/components/OnBoard'
import WelcomeList from '@/components/WelcomeList'

import { mapState } from 'vuex'

import { shortcutsMixin } from '@/components/mixins/shortcutsMixin.js'

export default {
  name: 'Collect',

  mixins: [shortcutsMixin],
  data: function () {
    return {
      clientset: false,
      uploadready: false,
      copyready: false,
      added: true,
    }
  },

  computed: {
    ...mapState({
      myNodes: (state) => state.myNodes,
      otherNodes: (state) => state.otherNodes,
      shortcutstate: (state) => state.shortcutstate,
      // toolmode: (state) => state.ui.mode,
    }),
  },

  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyPress)
    }
  },

  mounted() {
    setTimeout(this.loadShortcut, 1000)
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  },

  methods: {
    loadShortcut() {
      var e = false
      this.$store.dispatch('shortcutState', e)
    },

    clientAdded() {
      this.clientset = !this.clientset
    },

    addNode() {
      // console.log('add called')
      this.$store.dispatch('addNode')
      this.added = !this.added
    },

    editTrue(e) {
      this.$store.dispatch('shortcutState', e)
    },

    uploadAdded() {
      this.uploadready = !this.uploadready
    },

    copyDone() {
      this.copyready = !this.copyready

      // alert(
      //   'Now all you need to do is paste into a new node to display your media'
      // )
    },
  },
  components: {
    ModesCard,
    ListLayer,
    OnBoard,
    UploadLayer,
    WelcomeList,
  },
}
</script>

<style lang="css" scoped>
.welcome {
  width: 95%;
  margin-top: 1em;
  margin-left: 1em;
  background-color: white;
  border: 2px solid black;
  padding: 1em;
}

.mobile {
  margin-left: 1em;
  font-size: 1em;
}
.new {
  margin-left: 1em;
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
  stroke: #333;
}
.b,
.c {
  stroke-width: 7px;
}
.c,
.e {
  fill: none;
}
.c {
  stroke: #2d9cdb;
}
.d {
  stroke: none;
}
</style>
