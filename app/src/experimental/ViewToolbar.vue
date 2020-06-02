<template>
  <button v-on:click="resetScale">
    <Icon type="magnify" v-bind:size="20" theme="dark" />
    {{ scalePercentage }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      scalePercentage: 'ui/scalePercentage',
      isScaled: 'ui/isScaled',
      isTranslated: 'ui/isTranslated'
    })
  },
  methods: {
    resetScale() {
      this.$store.commit('ui/setScale', 1.0)
    },
    resetTranslation() {
      this.$store.commit('ui/setTranslation', { x: 0, y: 0 })
    }
  }
}
</script>

<style scoped>
button {
  outline: none;
  position: absolute;
  bottom: 20px;
  right: 20px;
  height: 40px;
  width: 105px;
  border-radius: 20px;
  padding: 0 15px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  border: none;
  outline: none;
}
</style>
