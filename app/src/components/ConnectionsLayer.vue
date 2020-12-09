<template>
  <div>
    <!-- view box same width as canvas -->
    <!-- falls off edge -->
    <svg id="connections" viewBox="0 0 2000 2000">
      <g v-for="(value, index) in positions_filtered" v-bind:key="index">
        <!-- still empty divs -->
        <g v-for="(nodes, index) in nodes_filtered" v-bind:key="index">
          <circle
            v-if="nodes.node_id == value.node_id"
            :cx="value.x_pos + value.width"
            :cy="value.y_pos + value.height / 4"
            r="15"
            width="30"
            height="30"
            @mousedown.prevent="
              buttonPress(nodes.node_id, value.x_pos, value.y_pos)
            "
            @mouseup.prevent="buttonUp(nodes.node_id, value.x_pos, value.y_pos)"
          />

          <g v-for="(lines, index) in configConnections" v-bind:key="index">
            <line
              v-if="lines.start_id == value.node_id"
              :x1="lines.x_pos_start + value.width"
              :y1="lines.y_pos_start + value.height / 4"
              :x2="lines.x_pos_end"
              :y2="lines.y_pos_end + value.height / 4"
              style="stroke: rgb(255, 0, 0); stroke-width: 2"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

//var initialMoveTo
//var id
var fromnode
var tonode
var xposstart
var yposstart
var xposend
var yposend

let newLine
let drawing = false

export default {
  name: 'ConnectionsLayer',

  data() {
    return {
      id: Number,
      x: Number,
      y: Number,
    }
  },
  computed: {
    ...mapState({
      configConnections: (state) => state.configConnections,
      configPositions: (state) => state.configPositions,
      myNodes: (state) => state.myNodes,
      otherNodes: (state) => state.otherNodes,
      toolmode: (state) => state.ui.mode,
      // connectionstate: (state) => state.connectionstate,
    }),

    nodes_filtered: function () {
      return this.myNodes.filter((nodes) => {
        return nodes.deleted == false
      })
    },

    positions_filtered: function () {
      return this.configPositions.filter((positions) => {
        return this.myNodes.some((node) => {
          return positions.node_id == node.node_id
        })
      })
    },
  },

  // watch: {
  //   toolmode: {
  //     handler() {
  //       this.toolState()
  //     },
  //   },
  // },
  methods: {
    // this should only fire if toolmode = connect
    buttonPress(id, x, y) {
      drawing = true
      this.id = id
      this.x = x
      this.y = y

      newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')

      //newLine.setAttribute('id', 'line2');
      newLine.setAttribute('stroke', 'red')
      newLine.setAttribute('stroke-width', '2')
      newLine.setAttribute('x1', event.clientX)
      newLine.setAttribute('y1', event.clientY)
      newLine.setAttribute('x2', event.clientX)
      newLine.setAttribute('y2', event.clientY)

      document.getElementById('connections').appendChild(newLine)
    },

    // this should only fire if ID is present
    // lots of empty connections
    buttonUp(id, x, y) {
      drawing = false
      document.getElementById('connections').removeChild(newLine)
      fromnode = this.id
      xposstart = this.x
      yposstart = this.y
      tonode = id
      xposend = x
      yposend = y

      this.$store.dispatch('makeConnect', {
        fromnode,
        tonode,
        xposstart,
        yposstart,
        xposend,
        yposend,
      })
    },
  },
}

function onMouseMove(event) {
  //Add code here
  if (drawing) {
    newLine.setAttribute('x2', event.clientX)
    newLine.setAttribute('y2', event.clientY)
  }
}
function onMouseUp() {
  if (drawing) {
    document.getElementById('connections').removeChild(newLine)
  }
}

function setup() {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

window.onload = () => setup()
</script>

<style scoped>
circle {
  fill: rgb(187, 227, 255);
  stroke: black;
  stroke-width: 2;
}
</style>
