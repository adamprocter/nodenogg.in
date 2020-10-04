<template>
  <div id="listwrapper">
    <div v-if="clientset">
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

    <div v-else>
      <form>
        <div>
          <p id="nodeid" :inner-html.prop="nodetext1 | marked"></p>

          <div v-if="name == false">
            <input
              type="text"
              v-model.trim="clientid"
              placeholder="device name"
              autocorrect="off"
              autocapitalize="none"
              ref="objectname"
              v-on:keyup.enter="setClient()"
              @focus="editTrue(true)"
              @blur="editTrue(false)"
            />
            <div class="btn-row">
              <BaseButton buttonClass="special" @click="setClient()"
                >Store</BaseButton
              >
            </div>
          </div>
          <div v-else>
            <h4>Saved</h4>
          </div>
        </div>
      </form>

      <form>
        <div>
          <p id="nodeid" :inner-html.prop="nodetext2 | marked"></p>
          <div v-if="microcosm == false">
            <input
              type="text"
              v-model.trim="localmicrocosm"
              placeholder="microcosm name"
              autocorrect="off"
              autocapitalize="none"
              autofocus
              v-on:keyup.enter="createMicrocosm()"
              @focus="editTrue(true)"
              @blur="editTrue(false)"
            />
            <div class="btn-row">
              <BaseButton
                buttonClass="special"
                @click="createMicrocosm(), letsGo()"
                >Create Microcosm</BaseButton
              >
            </div>
          </div>
          <div v-else>
            <h4>Loading...</h4>
          </div>
        </div>
      </form>
    </div>
    <!-- <ModeToolbar /> -->
  </div>
</template>

<script>
import Router from '@/router'
//import ModeToolbar from '@/experimental/ModeToolbar'
import ListLayer from '@/components/ListLayer'
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
      nodetext1:
        '## What shall we call you ? 👩‍🚀 \n First we need to connect this device to your ideas. This name is what allows you to create and edit your nodes and can be anything you like and this name is always anonymous.',
      nodetext2:
        '## Join/Start a microcosm ! 🚀 \n Now you can create your own microcosm to store your ideas and ask people to join you, either just tell them the name of the microcosm or share the alpha.nodenogg.in URL and add the ending; </br><em><b>/microcosm/nameofyourmicrocosm</b></em>',
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
      otherNodes: (state) => state.otherNodes,
      shortcutstate: (state) => state.shortcutstate,
      toolmode: (state) => state.ui.mode,
      connections: (state) => state.configConnections,
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
    if (localStorage.myNNClient && localStorage.mylastMicrocosm) {
      this.clientid = localStorage.myNNClient
      this.localmicrocosm = localStorage.mylastMicrocosm
      this.createMicrocosm()
      this.setClient()
      this.letsGo()
      this.clientset = 'true'
    }
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

    // editNode(e) {
    //   var nodeid = e.target.id
    //   var nodetext = e.target.value
    //   this.$store.dispatch('editNode', { nodeid, nodetext })
    // },

    createMicrocosm() {
      this.$store.dispatch('createMicrocosm', this.localmicrocosm)
      localStorage.setItem('mylastMicrocosm', this.localmicrocosm)
      this.microcosm = true
    },
    setClient() {
      this.$store.dispatch('setClient', this.clientid),
        localStorage.setItem('myNNClient', this.clientid)
      this.name = true
    },

    letsGo() {
      this.clientset = !this.clientset
      this.$emit('clientAdded')
    },
  },
  components: {
    ListLayer,
    // ModeToolbar,
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
