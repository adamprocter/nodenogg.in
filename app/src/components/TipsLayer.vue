<template>
  <div ref="nodes" class="node">
    <vue-draggable-resizable
      class="innernode"
      :w="250"
      :h="225"
      :x="205"
      :y="15"
      :z="1"
      :draggable="true"
      :resizable="false"
      style="background-color: #6fcf97;"
    >
      <div>
        <p id="nodeid" :inner-html.prop="nodetext | marked"></p>

        <div class="btn-row">
          <BaseButton buttonClass="danger" @click="deleteFlag()"
            >Hide</BaseButton
          >
        </div>
      </div>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  data: function () {
    return {
      nodetext:
        '## Shortcuts 🐢 -> 🐰 \n **n** to create new nodes. </br> **c** create connections </br> **a** or **s** select mode. </br> **m** move mode',
    }
  },

  mounted() {},
  filters: {
    marked: marked,
  },

  methods: {},
}
</script>

<style lang="css" scoped>
.start {
  opacity: 0;
  filter: alpha(opacity=0);
}
.vdr {
  padding: 0 0.5em;
}

.content {
  overflow: hidden;
  max-height: 100%;
}

h1,
h2,
h3,
p {
  margin: 0px;
}

h2 {
  float: right;
  font-size: 3em;
}

h3 {
  font-size: 3em;
  margin-top: 0.5em;
}

.btn-row {
  margin-bottom: 5px;
  padding: 0px 0px 15px 10px;
  border-radius: 4px;
}

input {
  font-size: 1em;
  padding: 10px;
  /* margin-left: 20px; */
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 10px;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-style: dotted;
}
</style>
