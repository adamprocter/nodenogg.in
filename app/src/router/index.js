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
    path: '/microcosm/:microcosm',
    component: Home
  },

  {
    // catches 404 errors
    path: '*',
    name: '404',
    component: () =>
      import(
        /* webpackChunkName: "NotFoundComponent" */ '../views/NotFound.vue'
      )
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: 'https://alpha.nodenogg.in/',
  //base: process.env.VUE_APP_HTTP + '://' + process.env.VUE_APP_URL + '',
  //base: process.env.VUE_APP_HTTP,
  routes
})

export default router
