<template>
  <Main inset>
    <div class="node-list" v-bind:class="{ full: !activeNode }">
      <Toolbar />
      <button @click="handleClick">Add node</button>
      <NodeListItem
        v-for="{ backgroundColor, text, node_id } in nodes"
        v-bind:backgroundColor="backgroundColor"
        v-bind:text="text"
        v-bind:key="`${node_id}-list`"
        v-bind:link="`${baseViewRoute}/${node_id}`"
      />
    </div>
    <NodeViewer
      v-if="!!activeNode"
      v-bind:text="activeNode.text"
      v-bind:node_id="activeNode.node_id"
      v-bind:backgroundColor="activeNode.backgroundColor"
      v-bind:back="baseViewRoute"
    />
  </Main>
</template>

<script>
import Main from '@/components/dev/Main'

import Toolbar from './components/Toolbar'
import NodeViewer from './components/NodeViewer'
import NodeListItem from './components/NodeListItem'
import viewDataMixin from '@/views/view.mixin'
import { generateNode } from '@/store/dev-utils'

export default {
  name: 'ListView',
  title: 'List',
  description: 'Shows nodes in a simple list',
  mixins: [viewDataMixin],
  methods: {
    handleClick() {
      this.createNode(generateNode())
    },
    updateNode() {
      console.log('update node')
    },
    deleteNode(nodeIds) {
      console.log('delete nodes', nodeIds)
    },
  },
  components: {
    Toolbar,
    NodeViewer,
    NodeListItem,
    Main,
  },
}
</script>

<style scoped>
.node-list {
  width: 40%;
  height: 100%;
  overflow-y: scroll;
}
.node-list.full {
  width: 100%;
}
</style>
