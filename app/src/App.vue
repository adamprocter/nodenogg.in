<template>
  <div id="app">
    <navigation />

    <router-view />
    <!-- <router-view v-if="this.window.width < 600" name="this.name" />
    <router-view v-else to="/organise" /> -->
  </div>
</template>

<script>
import { routes } from './router'
import Navigation from './components/Navigation'
export default {
  data: function () {
    return {
      // name: '',
      // window: {
      //   width: 0,
      //   height: 0,
      // },
      routes: routes.filter((route) => !!route.name),
    }
  },
  components: {
    navigation: Navigation,
  },
  // mounted() {
  //   window.addEventListener('resize', this.handleResize)
  //   this.handleResize()
  //   this.name = routes[1].name
  // },
  // destroyed() {
  //   window.removeEventListener('resize', this.handleResize)
  // },
  // methods: {
  //   handleResize() {
  //     this.window.width = window.innerWidth
  //   },
  // },
}
</script>
<style>
@import url('https://rsms.me/inter/inter.css');
body {
  padding: 0;
  margin: 0;
}

html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 40px;
}

h1 {
  font-size: 3em;
}
img {
  width: 100%;
}
</style>
