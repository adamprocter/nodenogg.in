import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // dynamic segement `:microcosm` is added to the path
  {
    path: '/:device/microcosm/:microcosm',
    component: Home
  }
  // TODO: Nodecard ID in URL
  // to get into editing a specific node??
  // {
  //   path: '/microcosm/:microcosm/:nodecard',
  //   component: Home
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
