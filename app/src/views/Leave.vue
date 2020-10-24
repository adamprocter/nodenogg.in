<template>
  <div class="leave"></div>
</template>
<script>
export default {
  name: 'Leave',

  created() {
    this.removeLocal()
  },

  methods: {
    removeLocal: function () {
      // localStorage.removeItem('myNNClient')
      localStorage.removeItem('mylastMicrocosm')

      location.assign(
        process.env.VUE_APP_HTTP + '://' + process.env.VUE_APP_URL + '/'
      )
    },
  },
}
</script>

<style lang="css" scoped></style>
