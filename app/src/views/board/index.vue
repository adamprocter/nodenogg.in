<template>
  <Main inset>
    <Toolbar />
    <NodeOverlay
      v-if="!!activeNode"
      v-bind:text="activeNode.text"
      v-bind:node_id="activeNode.node_id"
      v-bind:backgroundColor="activeNode.backgroundColor"
      v-bind:back="baseViewRoute"
    />
    <button @click="handleClick">Add node</button>

    <div class="grid">
      <NodeBoardItem
        v-for="{ backgroundColor, text, node_id } in nodes"
        v-bind:backgroundColor="backgroundColor"
        v-bind:text="text"
        v-bind:key="`${node_id}-list`"
        v-bind:link="`${baseViewRoute}/${node_id}`"
      />
    </div>
  </Main>
</template>

<script>
import Main from '@/components/dev/Main'

import Toolbar from './components/Toolbar'
import NodeOverlay from './components/NodeOverlay'
import NodeBoardItem from './components/NodeBoardItem'
import viewDataMixin from '@/views/view.mixin'
import { generateNode } from '@/store/dev-utils'

export default {
  name: 'BoardView',
  title: 'Board',
  description: 'Shows nodes on a board',
  mixins: [viewDataMixin],
  methods: {
    handleClick() {
      this.createNode(generateNode())
    },
  },
  components: {
    Toolbar,
    NodeOverlay,
    NodeBoardItem,
    Main,
  },
}
</script>

<style lang="css" scoped>
main {
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
}
.grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
