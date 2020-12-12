<template>
  <div ref="nodes" class="node">
    <div v-show="tipsplease">
      <draggable
        class="innernode"
        :w="250"
        :h="225"
        :x="540"
        :y="15"
        :z="0"
        :scale="scale"
        :draggable="true"
        :resizable="false"
        style="background-color: #6fcf97; border: 2px solid black"
      >
        <div>
          <p id="nodeid" :inner-html.prop="nodetext | marked"></p>

          <SvgButton @click="hideTips()" />
        </div>
      </draggable>
    </div>

    <div v-show="!tipsplease"></div>
  </div>
</template>

<script>
import marked from 'marked'
import draggable from '@/experimental/Draggable'
import SvgButton from '@/components/SvgButton'
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      nodetext:
        '## Shortcuts 🐢 -> 🐰 \n **n** to create new nodes. </br> **c** create connections </br> **a** or **s** select &amp; move nodes. </br> **m** pan and zoom canvas',
      tipsplease: true,
    }
  },
  computed: mapState({
    scale: (state) => state.ui.scale,
  }),
  filters: {
    marked: marked,
  },

  methods: {
    hideTips() {
      this.tipsplease = false
    },
  },
  components: {
    draggable,
    SvgButton,
  },
}
</script>

<style lang="css" scoped>
.vdr {
  padding: 0 0.5em;
}

.content {
  overflow: hidden;
  max-height: 100%;
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

.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}
</style>
