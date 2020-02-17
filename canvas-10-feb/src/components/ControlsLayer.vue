<template>
  <div class="controls">
    <div class="btn-row">
      <button on:click="popups.showPane = !popups.showPane">Button</button>
    </div>
    <!--
      <div class="popup" v-if="popups.showPane">
        <div class="popup-title">Pane Title</div>
        <label>
          <input type="radio" name="color" />
        </label>
    </div>-->
  </div>
</template>

<script></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(10, 10, 10);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}
</style>
