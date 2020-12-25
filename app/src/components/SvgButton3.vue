<template>
  <div>
    <button v-on="$listeners" class="button" :class="buttonClass">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 194 178">
        <g transform="translate(-1340.934 -573.185)">
          <g transform="translate(16 57)">
            <path
              class="a"
              d="M1370.346,606.448C1250.818,701.656,1237.2,715.157,1237.2,715.157l-12.18,28.185,32.968-8.841,132.15-102.707Z"
              transform="translate(103 -49)"
            />
            <path
              class="a"
              d="M0,0H47a8,8,0,0,1,8,8V35a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
              transform="translate(1484.229 527.185) rotate(50)"
            />
          </g>
          <path
            class="b"
            d="M1278.245,681.651c-43.206,34.469-41.047,33.506-41.047,33.506l-12.18,28.185,32.968-8.841,57.042-46.029Z"
            transform="translate(122 -12)"
          />
          <path
            class="c"
            d="M1370.346,606.448C1250.818,701.656,1237.2,715.157,1237.2,715.157l36.986-31.527,41.706,6.236,42.508-33.315,31.739-24.758Z"
            transform="translate(122 -12)"
          />
          <path
            class="d"
            d="M1370.346,606.448C1250.818,701.656,1237.2,715.157,1237.2,715.157l-12.18,28.185,32.968-8.841,132.15-102.707Z"
            transform="translate(122 -12)"
          />
          <path
            d="M10,0H46a9,9,0,0,1,9,9V35a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z"
            transform="translate(1498.229 573.185) rotate(50)"
          />
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
  background-color: rgba(255, 255, 255, 0);
}

.a {
  fill: #4f4f4f;
}
.b {
  fill: #2d9cdb;
}
.c {
  fill: #fff;
}
.d {
  fill: none;
  stroke: #000;
  stroke-width: 7px;
}
</style>
