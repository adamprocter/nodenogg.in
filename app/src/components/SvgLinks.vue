<template>
  <svg
    v-bind:viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
  >
    <template v-for="group in groups">
      <path
        @click="(e) => onClick(curve, e)"
        v-for="curve in group.links"
        v-bind:key="curve.id"
        v-bind:d="curve.path"
        v-bind:stroke="getPalette(curve.color, 'dark')"
        v-bind:stroke-dasharray="
          curve.lineDash
            ? curve.lineDash.join(' ')
            : defaultLinkProps.lineDash.join(' ')
        "
        v-bind:stroke-width="curve.lineWidth || defaultLinkProps.lineWidth"
      />
    </template>
    <path
      v-bind:stroke="getPalette('blue', 'dark')"
      v-bind:stroke-width="defaultLinkProps.lineWidth"
      v-if="newLink && newLink.target"
      v-bind:d="getCurve(newLink)"
    />
    <circle
      v-bind:cx="newLink.target.x"
      v-bind:cy="newLink.target.y"
      r="10"
      v-bind:fill="getPalette('blue', 'dark')"
      v-if="newLink && newLink.target"
    />
  </svg>
</template>

<script>
import { getPalette } from '@/experimental/constants/color'

//import { generateLinkHandles } from '@/experimental/utils/nodes'
//import { generateBezierCurve, makeBezier } from '@/experimental/utils/svg'
import { generateBezierCurve } from '@/experimental/utils/svg'
import { groupBy } from '@/experimental/utils/helpers'

const groupByFrom = groupBy('from')

export default {
  props: {},
  data() {
    return {
      getPalette,
      defaultLinkProps: {
        hue: 'dark',
        tension: 0.25,
        lineWidth: 5,
        lineDash: [0, 0],
      },
    }
  },

  computed: {
    groups() {
      const grouped = groupByFrom(this.links)
      return Object.keys(grouped).map((id) => {
        return {
          id,
          links: grouped[id].map((link) => {
            const fromNode = this.findNode(link.from)
            const toNode = this.findNode(link.to)
            return {
              ...link,
              path: generateBezierCurve(
                fromNode,
                toNode,
                this.defaultLinkProps.tension
              ),
            }
          }),
        }
      })
    },
  },
  methods: {
    getCurve(link) {
      const fromNode = this.findNode(link.from)
      const toNode = { ...link.target, width: 1, height: 1 }
      const r = generateBezierCurve(fromNode, toNode, 0.1)
      return r
    },
    onClick(link, e) {
      console.log(link)
      this.onClickLink([link.id])
    },
    findNode(id) {
      return [...this.nodes].find((pt) => pt.id === id)
    },
  },
}
</script>
