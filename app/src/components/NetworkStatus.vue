<template>
  <aside v-bind:class="{ online }">{{ online ? 'online' : 'offline' }}</aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      online: (state) => {
        return state.network.online
      },
    }),
  },
}
</script>
<style lang="css" scoped>
aside {
  background: coral;
  color: white;
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 10px;
}
aside.online {
  background: rgb(0, 205, 50);
}
</style>
