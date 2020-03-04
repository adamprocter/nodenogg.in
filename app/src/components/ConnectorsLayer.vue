<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
//import { mapState } from 'vuex'
//import { generateLinkHandles } from './mixins/nodes.js'
// import { drawLinkBezierCurve, drawArrowHead } from './mixins/canvas.js'
import { color } from './mixins/color.js'

export default {
  name: 'ConnectorsLayer',
  mixins: [color],

  mounted() {
    this.getPalette(1, 1)
  }
}

// export default {
//   name: 'ConnectorsLayer',
//   mixins: [generateLinkHandles, drawLinkBezierCurve, drawArrowHead, getPalette],
//   props: {
//     nodes: {
//       type: Array
//     },
//     connections: {
//       type: Array
//     }
//   },
//   mounted() {
//     this.canvas = this.$refs.canvas
//     this.context = this.canvas.getContext('2d')
//     this.draw()
//   },
//   data() {
//     return {
//       canvas: {},
//       context: {},
//       defaultLinkProps: {
//         // these are our initial 'default' settings for each link
//         hue: 'dark',
//         tension: 0.25,
//         lineWidth: 3,
//         lineDash: [0, 0]
//       }
//     }
//   },
//   // computed: mapState({
//   //   configConnect: state => state.configConnect
//   // }),

//   // Watch the props for changes and, if necessary, redraw canvas
//   watch: {
//     nodes() {
//       this.draw()
//     },
//     links() {
//       this.draw()
//     }
//   },
//   methods: {
//     /**
//      * Clears the context, renders links and nodes on initial load
//      * and when new data has been provided
//      **/
//     draw() {
//       this.clear()
//       this.context.save()
//       this.renderAllLinks()
//       this.renderAllNodes()
//       this.context.restore()
//     },

//     /**
//      * Clears drawing context
//      **/
//     clear() {
//       this.context.clearRect(0, 0, this.width, this.height)
//     },

//     /**
//      * Where a node can be rendered
//      * @param {Node} node - Target node
//      **/
//     renderNode({ x, y }) {
//       this.context.setTransform(1, 0, 0, 1, x, y)
//       // this renders nothing, but if we wanted to we
//       // could render nodes in the canvas as well
//       this.context.setTransform(1, 0, 0, 1, 0, 0)
//     },

//     /**
//      * Renders a link between two nodes
//      **/
//     renderLink({ from, to, color, lineDash, lineWidth, hue, tension, arrow }) {
//       // fetch the nodes based on their id reference provided in the link
//       const fromNode = this.findNode(from)
//       const toNode = this.findNode(to)

//       if (fromNode && toNode) {
//         // apply the link color, falling back to defaultLinkProps
//         this.context.strokeStyle = getPalette(
//           color,
//           hue || this.defaultLinkProps.hue
//         )

//         // apply link styling, falling back to defaultLinkProps
//         this.context.setLineDash(lineDash || this.defaultLinkProps.lineDash)
//         this.context.lineWidth = lineWidth || this.defaultLinkProps.lineWidth

//         // establish link tension, falling back to defaultLinkProps
//         const curveTension = !isNaN(tension) || this.defaultLinkProps.tension

//         // add the curve to our drawing context
//         drawLinkBezierCurve(this.context, fromNode, toNode, curveTension)
//         if (arrow) drawArrowHead(this.context, fromNode, toNode)

//         // render the curve
//         this.context.stroke()
//       }
//     },

//     /**
//      * Helper to fetch a single node based on its id
//      *
//      * @param {string} id - Reference to node id
//      * @returns {Node}
//      **/
//     findNode(id) {
//       return [...this.nodes].find(pt => pt.id === id)
//     },

//     /**
//      * Iterate through the array of links, rendering each one
//      **/
//     renderAllLinks() {
//       for (let link of this.links) {
//         this.renderLink(link)
//       }
//     },

//     /**
//      * Included for demo only, doesn't actually render anything
//      * iterate through the array of nodes, rendering each one
//      **/
//     renderAllNodes() {
//       for (let node of this.nodes) {
//         this.renderNode(node)
//       }
//     }
//   }
// }
</script>
<style scoped>
canvas {
  z-index: 1;
  position: absolute;
}
</style>
