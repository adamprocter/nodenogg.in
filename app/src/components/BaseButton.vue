<template>
  <div>
    <!-- FIXME: Maybe need to use $attrs at somepoint -->
    <button v-on="$listeners" class="button" :class="buttonClass">
      <slot>DEFAULT</slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String
    }
  }
}
</script>


<style lang="css" scoped>
button {
  font-size: 1em;
  touch-action: manipulation;
  color: black;
  border: none;
  outline: none;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #000000;
  padding: 0.6em;
  margin-right: 1em;
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
</style>