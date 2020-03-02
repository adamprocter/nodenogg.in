<script>
import Vue from 'vue';
import NodeEditor from '@/NodeEditor.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    NodeEditor
  }
});
</script>

<template>
  <div id="app">
    <NodeEditor />
  </div>
</template>
