<template>
  <Main inset>
    <button v-on:click="handleClick">Create node</button>
    {{ JSON.stringify(nodes) }}
  </Main>
</template>

<script>
import { generateNode } from '@/store/dev-utils'
import Main from '@/components/dev/Main'
import viewDataMixin from '@/views/view.mixin'

export default {
  name: 'SandboxView',
  title: 'Sandbox',
  description: 'Sandbox for store',
  mixins: [viewDataMixin],
  methods: {
    handleClick() {
      this.createNode(generateNode())
    },
  },
  components: {
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
