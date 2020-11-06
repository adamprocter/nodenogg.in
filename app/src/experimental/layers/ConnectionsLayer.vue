<template>
  <svg
    v-bind:viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
  >
    <path
      v-for="(value, index) in configConnections"
      v-bind:key="index"
      v-bind:d="value.path"
      v-bind:stroke="getPalette(value.color, 'dark')"
      v-bind:stroke-dasharray="
        value.linedash
          ? value.linedash.join(' ')
          : defaultConnectionProps.linedash.join(' ')
      "
      v-bind:stroke-width="value.linewidth || defaultConnectionProps.linewidth"
    />

    <!-- <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" /> -->
  </svg>
</template>

<script>
import { getPalette } from '@/experimental/constants/color'
import { generateBezierCurve } from '@/experimental/utils/svg'
import { mapState } from 'vuex'

export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  data() {
    return {
      getPalette,
      defaultConnectionProps: {
        hue: 'dark',
        tension: 0.25,
        linewidth: 5,
        linedash: [0, 0],
      },
    }
  },

  computed: mapState({
    myNodes: (state) => state.myNodes,
    otherNodes: (state) => state.otherNodes,
    configConnections: (state) => state.configConnections,
  }),

  //  groups() {
  //     const grouped = groupByFrom(this.links);
  //     return Object.keys(grouped).map(id => {
  //       return {
  //         id,
  //         links: grouped[id].map(link => {
  //           const fromNode = this.findNode(link.from);
  //           const toNode = this.findNode(link.to);
  //           return {
  //             ...link,
  //             path: generateBezierCurve(
  //               fromNode,
  //               toNode,
  //               this.defaultLinkProps.tension
  //             )
  //           };
  //         })
  //       };
  //     });
  //   }
  // },

  methods: {
    getCurve(connection) {
      const fromNode = this.findNode(connection.from)
      const toNode = { ...connection.target, width: 1, height: 1 }
      const r = generateBezierCurve(fromNode, toNode, 0.1)
      return r
    },
  },
}
</script>
<style scoped>
svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
path {
  fill: none;
  transition: stroke-width 0.05s ease-in-out;
}
path:hover {
  stroke-width: 10px;
}
</style>
