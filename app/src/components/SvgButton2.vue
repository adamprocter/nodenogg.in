<template>
  <div>
    <button v-on="$listeners" class="button" :class="buttonClass">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 176 151">
        <g transform="translate(-1582 -611)">
          <rect width="164" height="130" transform="translate(1582 632)" />
          <g class="a" transform="translate(1594 611)">
            <rect class="d" width="164" height="130" />
            <rect class="e" x="3.5" y="3.5" width="157" height="123" />
          </g>
          <line class="b" x2="76" transform="translate(1605.5 631.5)" />
          <line class="c" x2="106" transform="translate(1605.5 659.5)" />
          <line class="b" x2="76" transform="translate(1605.5 687.5)" />
          <line class="c" x2="106" transform="translate(1605.5 714.5)" />
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
    },
  },
}
</script>

<style lang="css" scoped>
button {
  background-color: #6fcf97;
  touch-action: manipulation;
  border: none;
  outline: none;
  cursor: pointer;
}

button.nodes {
  background-color: rgb(155, 194, 216);
}

.a {
  fill: #fff;
  stroke-width: 7px;
}
.a,
.b {
  stroke: #000;
}
.b,
.c,
.e {
  fill: none;
}
.b {
  stroke-width: 4px;
}
.c {
  stroke: #2d9cdb;
  stroke-width: 6px;
}
.d {
  stroke: none;
}
</style>
