<template>
  <div class="debug">
    <hr />
    <!-- <h2>Debug Options</h2> -->
    <h4>LAST UPDATE 1st March 2020.</h4>
    <p>You need to know what this button does before you press it.</p>
    <Button class="danger" @click="removeLocal()">
      Join another microcosm
    </Button>
    <!-- <button @click="exportStorage()">Export my contributions</button>
    <button class="danger" v-on:click="deleteClient">
      Delete my contributions (inc. attachments) permanently
    </button>
    <button @click="handleConnection()">Online check</button>-->
    <hr />
  </div>
</template>

<script>
// This is for detecting offline issues
var serverUrl = 'https://nodenogg.in'

export default {
  mounted() {
    window.addEventListener('online', this.handleConnection)
    window.addEventListener('offline', this.handleConnection)
  },
  methods: {
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
      location.reload()
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
li:before {
  content: '';
}
.danger {
  background-color: red;
}

button {
  font-size: 1em;
  touch-action: manipulation;
  color: white;
  border: none;
  outline: none;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #000000;
  padding: 0.6em;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}

b {
  background-color: yellow;
  padding-right: 2em;
}
</style>
