<template>
  <div>
    <h1>Admin</h1>
    <p>Access to some objects to test redirect of CouchDB and credentails</p>

    <div v-for="(value, index) in configRemote" v-bind:key="index">
      {{ value.protocol }}{{ value.couchusername }}:{{ value.couchpassword }}@{{
        value.couchurl
      }}
    </div>
    <form>
      <input
        type="text"
        v-model="protocol"
        placeholder="https://"
        autocorrect="off"
        autocapitalize="none"
      />
      <input
        type="text"
        v-model="couchusername"
        placeholder="couch admin username"
        autocorrect="off"
        autocapitalize="none"
      />
      <input
        type="text"
        v-model="couchpassword"
        placeholder="couch admin password"
        autocorrect="off"
        autocapitalize="none"
      />
      <input
        type="text"
        v-model="couchurl"
        placeholder="youcouch.com"
        autocorrect="off"
        autocapitalize="none"
      />

      <button
        @click.prevent="
          updateRemote(protocol, couchusername, couchpassword, couchurl)
        "
      >
        Change Credentials
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NitPicky',

  data: function () {
    return {
      protocol: '',
      couchusername: '',
      couchpassword: '',
      couchurl: '',
    }
  },
  computed: mapState({
    configRemote: (state) => state.configRemote,
  }),

  methods: {
    updateRemote(protocol, couchusername, couchpassword, couchurl) {
      // console.log(protocol, couchusername, couchpassword, couchurl)
      this.$store.dispatch('updateRemote', {
        protocol,
        couchusername,
        couchpassword,
        couchurl,
      })
    },
  },
}
</script>

<style lang="css" scoped></style>
