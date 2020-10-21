<template>
  <div id="app">
    <navigation />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import { routes } from './router'
import Navigation from './components/Navigation'
export default {
  data: function () {
    return {
      routes: routes.filter((route) => !!route.name),
    }
  },
  components: {
    navigation: Navigation,
  },
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
