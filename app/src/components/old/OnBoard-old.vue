<template>
  <div class="notlogged">
    <p>
      nodenogg.in is a
      <span>work in progress</span> collaborative co-creation research and
      design thinking tool, read more details and links in the
      <a href="/about">about</a> section.
    </p>

    <form v-show="parta" onsubmit="return false;">
      <h2>1</h2>
      <h3>microcosm</h3>
      <p>
        create or join a microcosm. a microcosm is a sharable digital space that
        can be shared privately between a group of individuals. all content /
        data you contribute is stored locally on your device and then shared
        privately to others on the same microcosm. you can remove your
        contributions at any time, they belong to you.
      </p>
      <input
        type="text"
        v-model.trim="localmicrocosm"
        placeholder="microcosm name"
        autocorrect="off"
        autocapitalize="none"
        autofocus
        v-on:keyup.enter="createMicrocosm(), setFocus()"
      />
      <BaseButton buttonClass="onboard" @click="createMicrocosm(), setFocus()"
        >+</BaseButton
      >
    </form>

    <form v-show="partb" onsubmit="return false;">
      <h2>2</h2>
      <h3>object</h3>
      <p>
        give yourself an object name, this is what connects you to your content
        / data. this object name is anonymous and stored privately.
      </p>
      <input
        type="text"
        v-model.trim="clientid"
        placeholder="object name"
        autocorrect="off"
        autocapitalize="none"
        ref="objectname"
        v-on:keyup.enter="setClient(), setFocusTwo()"
      />
      <BaseButton buttonClass="onboard" @click="setClient(), setFocusTwo()"
        >+</BaseButton
      >
    </form>

    <form v-show="partc">
      <input
        class="start"
        type="text"
        v-on:keyup.enter="letsGo()"
        ref="objectnametwo"
      />
      <h2>3</h2>
      <h3>start</h3>
      <BaseButton buttonClass="onboard" @click="letsGo()">+</BaseButton>
    </form>
  </div>
</template>

<script>
var delay = 100
var delaytwo = 100

import Router from '@/router'

export default {
  data: function () {
    return {
      localmicrocosm: Router.currentRoute.params.microcosm,
      clientid: '',
      parta: true,
      partb: false,
      partc: false,
    }
  },

  mounted() {
    if (localStorage.myNNClient) {
      this.clientid = localStorage.myNNClient
      this.localmicrocosm = localStorage.mylastMicrocosm
      this.createMicrocosm()
      this.setClient()
      this.letsGo()
    }
  },

  methods: {
    createMicrocosm() {
      this.partb = true
      this.$store.dispatch('createMicrocosm', this.localmicrocosm)
      localStorage.setItem('mylastMicrocosm', this.localmicrocosm)
    },
    setClient() {
      ;(this.partc = true),
        this.$store.dispatch('setClient', this.clientid),
        localStorage.setItem('myNNClient', this.clientid)
    },

    letsGo() {
      this.$emit('client-added')
      // this.$emit('readyMode')
    },
    setFocus() {
      setTimeout(this.readyFocus, delay)
    },
    setFocusTwo() {
      setTimeout(this.readyFocusTwo, delaytwo)
    },
    readyFocus() {
      this.$refs.objectname.focus()
    },
    readyFocusTwo() {
      this.$refs.objectnametwo.focus()
    },
  },
}
</script>

<style lang="css" scoped>
.start {
  opacity: 0;
  filter: alpha(opacity=0);
}

h1,
h2,
h3,
p {
  margin: 0px;
}

h2 {
  float: right;
  font-size: 3em;
}

h3 {
  font-size: 3em;
  margin-top: 0.5em;
}

form {
  /* width: 400px; */
  padding: 1em;
  border-style: solid;
  border-width: 0.5em;
  border-color: #cab6ff;
  margin-top: 1em;
}

input {
  border-style: solid;
  border-width: 1px;
  border-color: #cab6ff;
  padding: 0.5em;
}

@media only screen and (min-width: 640px) {
  /* Style adjustments for viewports that meet the condition */

  /* .notlogged {
    grid-column: 1 / 3;
    grid-row: 1;
  } */
}
</style>
