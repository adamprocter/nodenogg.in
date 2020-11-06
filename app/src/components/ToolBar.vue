<template>
  <div ref="nodes" class="node">
    <draggable
      class="innernode"
      :w="127"
      :h="84"
      :x="0"
      :y="0"
      :z="1"
      :draggable="true"
      :resizable="false"
      style="border: 0px"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="newnode">
        <g transform="translate(-1345 -843)">
          <rect
            class="a"
            width="127"
            height="84"
            transform="translate(1345 865)"
          />
          <g class="b" transform="translate(1361 843)">
            <rect class="d" width="127" height="84" />
            <rect class="e" x="3.5" y="3.5" width="120" height="77" />
          </g>
          <line class="c" x2="41" transform="translate(1406.5 884.5)" />
          <line class="c" y2="41" transform="translate(1426.5 863.5)" />
        </g>
      </svg>
    </draggable>
  </div>
</template>

<script>
import draggable from '@/experimental/Draggable'
export default {
  data: function () {
    return {}
  },
  components: {
    draggable,
  },
}
</script>

<style lang="css" scoped>
.a {
  fill: #333;
}
.b {
  fill: #fff;
}
.b,
.c {
  stroke: #333;
  stroke-width: 7px;
}
.c,
.e {
  fill: none;
}
.d {
  stroke: none;
}
</style>
