<template>
  <nav class="navigation">
    <router-link v-for="route in routes" :key="route.name" :to="route.path">
      <div v-if="route.path != '/nitpicky'">
        {{ route.name }}
      </div></router-link
    >
  </nav>
</template>

<script>
import { routes } from '../router'

export default {
  data: function () {
    return {
      routes: routes.filter((route) => !!route.name),
    }
  },
}
</script>

<style scoped>
nav.navigation {
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 50;
  width: 100%;
  background: rgb(245, 245, 245);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  height: 40px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
