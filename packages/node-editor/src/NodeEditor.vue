<script>
export default {
  name: "NodeEditor",
  data() {
    return {
      example: 'My data'
    }
  }
};
</script>

<template>
  <div class="editor">{{example}}</div>
</template>

<style scoped>
.editor {
  display: block;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
  font-size: 24px;
}
</style>
