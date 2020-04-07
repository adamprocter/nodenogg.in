<template>
  <div class="controls">
    <div class="btn-row">
      <BaseButton buttonClass="action" @click="addNode()"
        >Create Node</BaseButton
      >
      <BaseButton buttonClass="action" @click="removeLocal()"
        >Join another microcosm</BaseButton
      >
      <!-- <BaseButton @click="exportStorage()">Export my contributions</BaseButton>
    <BaseButton buttonClass="danger" v-on:click="deleteClient">
      Delete my contributions (inc. attachments) permanently
    </BaseButton>
      <BaseButton @click="handleConnection()">Online check</BaseButton>-->
      <p class="who">
        microcosm =
        <b>{{ myMicrocosm }}</b> | object =
        <b>{{ myClient }}</b>
      </p>
    </div>
    <!-- TEMP: This was old code for possible pop up panes  -->
    <!-- <button on:click="popups.showPane = !popups.showPane"> -->
    <!--
      <div class="popup" v-if="popups.showPane">
        <div class="popup-title">Pane Title</div>
        <label>
          <input type="radio" name="color" />
        </label>
    </div>-->
  </div>
</template>

<script>
// This is for detecting offline issues
var serverUrl = 'https://nodenogg.in'
import { mapState } from 'vuex'

export default {
  mounted() {
    window.addEventListener('online', this.handleConnection)
    window.addEventListener('offline', this.handleConnection)
  },

  computed: mapState({
    myMicrocosm: state => state.microcosm,
    myClient: state => state.myclient
  }),
  methods: {
    addNode() {
      this.$store.dispatch('addNode')
    },
    exportStorage: function() {
      // Save local indexeddb document-store to JSON file
      // or export state.notes to JSON file
    },
    removeLocal: function() {
      localStorage.removeItem('myNNClient')
      localStorage.removeItem('mylastMicrocosm')
      // Hardcoded as when I set a URL had parameters the reload fails
      //location.assign('https://alpha.nodenogg.in/')
      //location.assign('http://localhost:8080/')

      location.assign(
        process.env.VUE_APP_HTTP + '://' + process.env.VUE_APP_URL + '/'
      )
      // location.reload()
    },

    deleteClient() {
      this.$store.dispatch('deleteClient')
    },
    handleConnection: function() {
      var ref = this
      if (navigator.onLine) {
        this.isReachable(this.getServerUrl()).then(function(online) {
          if (online) {
            // handle online status
            console.log('online')
            location.reload()
          } else {
            console.log('no connectivity')
          }
        })
      } else {
        // handle offline status
        console.log('offline')
        ref.$emit('offlineTriggered')
      }
    },
    isReachable: function(url) {
      return fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(function(resp) {
          return resp && (resp.ok || resp.type === 'opaque')
        })
        .catch(function(err) {
          console.warn('[conn test failure]:', err)
        })
    },
    getServerUrl: function() {
      return serverUrl || window.location.origin
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(10, 10, 10);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.who {
  color: white;
}

.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}
</style>
