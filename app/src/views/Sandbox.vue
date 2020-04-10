<template>
  <div class="container">
    <pzc>
      <div class="board">Inner</div>
    </pzc>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PanZoomContainer from '../experimental/PanZoomContainer'
export default {
  name: 'Sandbox',
  data: function() {
    return {}
  },
  components: {
    pzc: PanZoomContainer
  },
  computed: mapState({
    myVersion: state => state.version
  })
}
</script>

<style scoped>
.container {
  width: 600px;
  height: 600px;
}
.board {
  background: grey;
  width: 1200px;
  height: 1200px;
}
</style>
