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

    <!-- <p>{{ clientid }} / {{ microcosm }}</p> -->
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import * as allModes from '@/experimental/modes'

export default {
  mounted() {
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
        if (confirm('Are you sure you want to leave this microcosm ?')) {
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
