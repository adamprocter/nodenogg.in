<template>
  <svg
    v-bind:viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
  >
    <template v-for="group in groups">
      <path
        v-on:click="(e) => onClick(curve, e)"
        v-for="curve in group.connections"
        v-bind:key="curve.id"
        v-bind:d="curve.path"
        v-bind:stroke="getPalette(curve.color, 'dark')"
        v-bind:stroke-dasharray="
          curve.lineDash
            ? curve.lineDash.join(' ')
            : defaultConnectionProps.lineDash.join(' ')
        "
        v-bind:stroke-width="
          curve.lineWidth || defaultConnectionProps.lineWidth
        "
      />
    </template>
    <path
      v-bind:stroke="getPalette('blue', 'dark')"
      v-bind:stroke-width="defaultConnectionProps.lineWidth"
      v-if="newConnection && newConnection.target"
      v-bind:d="getCurve(newConnection)"
    />
    <circle
      v-bind:cx="newConnection.target.x"
      v-bind:cy="newConnection.target.y"
      r="10"
      v-bind:fill="getPalette('blue', 'dark')"
      v-if="newConnection && newConnection.target"
    />
  </svg>
</template>

<script>
import { getPalette } from '@/experimental/constants/color'

// import { generateConnectionHandles } from '@/utils/nodes'
// import { generateBezierCurve, makeBezier } from '@/utils/svg'
//import { generateConnectionHandles } from '@/utils/nodes'
import { generateBezierCurve } from '@/experimental/utils/svg'
import { groupBy } from '@/experimental/utils/helpers'
import { mapState } from 'vuex'

const groupByFrom = groupBy('from')

export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    nodes: {
      type: Array,
    },
    connections: {
      type: Array,
    },
    newConnection: {
      type: Object,
    },
    onClickConnection: {
      type: Function,
    },
  },
  data() {
    return {
      getPalette,
      defaultConnectionProps: {
        hue: 'dark',
        tension: 0.25,
        lineWidth: 5,
        lineDash: [0, 0],
      },
    }
  },
  computed: {
    groups() {
      const grouped = groupByFrom(this.connections)
      return Object.keys(grouped).map((id) => {
        return {
          id,
          connections: grouped[id].map((connection) => {
            const fromNode = this.findNode(connection.from)
            const toNode = this.findNode(connection.to)
            return {
              ...connection,
              path: generateBezierCurve(
                fromNode,
                toNode,
                this.defaultConnectionProps.tension
              ),
            }
          }),
        }
      })
    },

    ...mapState({
      connections: (state) => state.configConnections,
    }),
  },
  methods: {
    getCurve(connection) {
      const fromNode = this.findNode(connection.from)
      const toNode = { ...connection.target, width: 1, height: 1 }
      const r = generateBezierCurve(fromNode, toNode, 0.1)
      return r
    },
    onClick(connection) {
      this.onClickConnection(
        [connection.id],
        !!event.shiftKey || !!event.metaKey
      )
    },
    findNode(id) {
      return [...this.nodes].find((pt) => pt.id === id)
    },

    // startConnect(connectid, fromNode, toNode, startx, starty, endx, endy, connected) {
    //   this.$store.dispatch('startConnect', {
    //     connectid,
    //     fromNode,
    //     toNode,
    //     startx,
    //     starty,
    //     endx,
    //     endy,
    //     connected,
    //   })
    // },
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
