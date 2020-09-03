<template>
  <div>
    <!-- FIXME: Maybe need to use $attrs at somepoint -->
    <button v-on="$listeners" class="button" :class="buttonClass" type="button">
      <slot></slot>
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
  font-size: 0.8em;
  touch-action: manipulation;
  color: black;
  border: none;
  outline: none;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #000000;
  padding: 0.6em;
  margin-right: 1em;
  margin-top: 1em;
}

button.onboard {
  font-size: 1.8em;
  color: black;
  border-style: solid;
  border-width: 5px;
  border-color: black;
  border-radius: 50%;
  background-color: white;
  box-shadow: none;
  height: 1.5em;
  width: 1.5em;
  padding: 0px;
}

button.special {
  background-color: #f2c94c;
}

button.danger {
  color: white;
  background-color: red;
}

button.action {
  background-color: aqua;
}

button:active {
  background-color: #cab6ff;
}
/* FIXME: old code  */
button.new-link {
  position: absolute;
  top: calc(50%);
  right: -30px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  z-index: 100;
  background-color: Transparent;
  /* background-color: #cab6ff; */
  outline: none;
}
</style>
