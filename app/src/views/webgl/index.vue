<!-- eslint-disable -->
<template>
  <Main>
    <Toolbar>
      <button v-on:click="handleClick">Add node</button>
    </Toolbar>
    <NodeOverlay
      v-if="!!activeNode"
      v-bind:text="activeNode.text"
      v-bind:node_id="activeNode.node_id"
      v-bind:backgroundColor="activeNode.backgroundColor"
      v-bind:back="baseViewRoute"
    />
    <Renderer
      :backgroundColor="0xfbf9f9"
      :resolution="2.0"
      :height="height"
      :width="width"
      :transparent="false"
      @click="handleBackgroundClick"
      @rightClick="handleBackgroundRightClick"
      @dragStart="handleBackgroundDragStart"
      @drag="handleBackgroundDrag"
      @dragEnd="handleBackgroundDragEnd"
      ref="renderer"
    >
      <Node
        v-for="{
          text,
          node_id,
          width,
          height,
          fontSize,
          position,
          backgroundColor,
        } in nodes"
        v-bind:key="`webgl-node-${node_id}`"
        v-bind:node_id="node_id"
        @click="handleNodeClick"
        @dragStart="handleNodeDragStart"
        @drag="handleNodeDrag"
        @dragEnd="handleNodeDragEnd"
        @rightClick="handleRightClick"
        v-bind:selected="selected.indexOf(node_id) > -1"
        v-bind:dragging="node_id === dragging"
        v-bind:width="width"
        v-bind:height="height"
        v-bind:fontSize="fontSize"
        v-bind:x="position.x"
        v-bind:y="position.y"
        v-bind:backgroundColor="backgroundColor"
        v-bind:text="text"
      />
    </Renderer>
  </Main>
</template>

<script>
import Main from '@/components/dev/Main'
import router from '@/router'

import Toolbar from './Toolbar'
import NodeOverlay from './NodeOverlay'
import Renderer from './components/Renderer'
import Node from './components/Node'
import viewDataMixin from '@/views/view.mixin'
import { generateNode } from '@/store/dev-utils'

export default {
  title: 'WebGL',
  description: 'Shows nodes on a 2D board',
  name: 'WebGLView',
  label: 'alpha',
  mixins: [viewDataMixin],
  data() {
    return {
      viewId: 'webgl',
      width: window.innerWidth,
      height: window.innerHeight,
      selected: [],
      dragging: false,
    }
  },
  watch: {
    nodes() {
      console.log(this.nodes)
    },
  },
  methods: {
    handleClick() {
      this.createNode(generateNode())
    },
    clearNodeSelection() {
      this.selected = []
    },
    updateNodeSelection(nodes, grouped) {
      console.log(nodes, grouped)
      // if we're making a grouped selection, add to existing
      // selection array. if not, start with a blank array
      // let newSelection = grouped ? [...this.selected] : []
      // // iterate through list of node_ids
      // nodes.forEach(node_id => {
      //   // check if the item already exists in the array
      //   const exists = this.selected.indexOf(node_id) > -1
      //   if (exists) {
      //     // Remove node_id from selection if it's duplicated
      //     newSelection = shallowRemoveFromArray(newSelection, node_id)
      //   } else {
      //     // Add node_id to selection if it's not present
      //     newSelection.push(node_id)
      //   }
      // })
      // // update Vue reference to selection
      // this.selected = newSelection
    },
    handleNodeClick(node_id, { originalEvent: { shiftKey } }) {
      console.log(`CLICK:`, node_id, shiftKey)
      router.push({
        name: 'microcosm.view.node',
        params: { microcosm: 'sample-microcosm', node_id, view: 'webgl' },
      })

      // this.updateNodeSelection([node_id], shiftKey);
    },
    handleRightClick(node_id) {
      console.log(`RIGHT CLICK:`, node_id)
      // this.generatedNodes = this.generatedNodes.map(node => {
      //   if (node.node_id === node_id) {
      //     return {
      //       ...node,
      //       backgroundColor: colors[randomInt(0, colors.length - 1)]
      //     };
      //   } else {
      //     return node;
      //   }
      // });
    },
    handleNodeDragStart(node_id, update) {
      console.log(`DRAG START:`, node_id, update)
    },
    handleNodeDrag(node_id, update) {
      console.log(`DRAG:`, node_id, update)
    },
    handleNodeDragEnd(node_id, update) {
      console.log(`DRAG END:`, node_id, update)
    },
    handleBackgroundClick() {
      this.clearNodeSelection()
      console.log('clicking!')
    },
    handleBackgroundRightClick() {
      this.clearNodeSelection()
      console.log('right click on background!')
    },
    handleBackgroundDragStart(event) {
      console.log('starting background drag', event)
    },
    handleBackgroundDrag(event) {
      console.log('background drag', event)
    },
    handleBackgroundDragEnd(event) {
      console.log('ending background drag', event)
    },
  },
  components: {
    Toolbar,
    NodeOverlay,
    Main,
    Renderer,
    Node,
  },
}
</script>
<!-- eslint-enable -->
