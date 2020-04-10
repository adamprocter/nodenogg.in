<template>
  <div id="app">
    <div id="nav">
      <navigation/>
    </div>
    <router-view />
  </div>
</template>

<script>
import { routes } from './router'
import Navigation from './components/Navigation'
export default {
  data: function() {
    return {
      routes: routes.filter(route => !!route.name)
    }
  },
  components: {
    navigation: Navigation
  }
}
</script>
<style>
@import url('https://rsms.me/inter/inter.css');

#app {
  font-family: 'Inter var', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 3em;
}
img {
  width: 100%;
}
</style>
