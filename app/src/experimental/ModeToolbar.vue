<template>
  <nav>
    <button
      v-for="mode in allModes"
      v-on:click="() => setMode(mode.name)"
      v-bind:key="mode.name"
      v-bind:class="isActive(mode) ? 'active' : 'inactive'"
    >
      <Icon
        v-bind:type="mode.icon"
        v-bind:theme="isActive(mode) ? 'light' : 'dark'"
      />
    </button>

    <p>{{ clientid }} / {{ microcosm }}</p>
  </nav>
</template>

<script>
var serverUrl = 'https://nodenogg.in'
import { mapState, mapGetters } from 'vuex'

import * as allModes from '@/experimental/modes'

export default {
  mounted() {
    window.addEventListener('online', this.handleConnection)
    window.addEventListener('offline', this.handleConnection)
    this.clientid = localStorage.myNNClient
    this.microcosm = localStorage.mylastMicrocosm
  },
  computed: {
    ...mapState({
      mode: (state) => state.ui.mode,
    }),
    ...mapGetters({
      activeMode: 'ui/activeMode',
    }),
  },

  methods: {
    setMode(mode) {
      this.$store.commit('ui/setMode', mode)
      if (mode == 'exit') {
        if (confirm('Are you sure you want to leave this microcoms?')) {
          this.removeLocal()
        } else {
          // nothing happens
        }
      }
      if (mode == 'addNode') {
        this.$emit('add-node')
        // this.$store.dispatch('addNode')
      }
      if (mode == 'upload') {
        this.$emit('upload-added')
      }
      if (mode == 'copy') {
        this.$emit('copy-done')

        alert(
          'Now all you need to do is paste into a new node to display your media'
        )
      }
      if (mode == 'draw') {
        this.$emit('draw-on')
        // console.log(mode)
      }
      if (mode != 'draw') {
        this.$emit('draw-off')
        //console.log(mode)
      }
    },

    isActive(mode) {
      return this.mode === mode.name
    },

    removeLocal: function () {
      localStorage.removeItem('mylastMicrocosm')

      location.assign(
        process.env.VUE_APP_HTTP + '://' + process.env.VUE_APP_URL + '/'
      )
    },

    handleConnection: function () {
      var ref = this
      if (navigator.onLine) {
        this.isReachable(this.getServerUrl()).then(function (online) {
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
        ref.$emit('offline-triggered')
      }
    },
    isReachable: function (url) {
      // This should pick up a CORS error but it doesnt seem to //
      return fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(function (resp) {
          return resp && (resp.ok || resp.type === 'opaque')
        })
        .catch(function (err) {
          console.warn('[conn test failure]:', err)
        })
    },
    getServerUrl: function () {
      return serverUrl || window.location.origin
    },
  },
  data() {
    return {
      clientid: String,
      microcosm: String,
      allModes,
    }
  },
}
</script>

<style scoped>
nav {
  display: none;
}

@media (min-width: 450px) {
  nav {
    position: fixed;

    bottom: 1em;
    left: 1em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  button {
    border: none;
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
    margin-top: 1em;
    background: white;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    outline: none;
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
  }
  button.active {
    background: rgb(30, 30, 30);
  }
}
</style>
