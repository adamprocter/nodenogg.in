import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cards from '../views/Cards.vue'
import List from '../views/List.vue'
import Discarded from '../views/Discarded.vue'
import Leave from '../views/Leave.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
//import store from '../store'
// import Oldhome from '../views/Oldhome'
//import Test from '../views/Test'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Collect',
    component: List,
  },
  {
    path: '/organise',
    name: 'Organise',
    component: Home,
  },

  {
    path: '/cards',
    name: 'Cards',
    component: Cards,
  },

  {
    path: '/discarded',
    name: 'Discarded',
    component: Discarded,
  },
  {
    path: '/leave',
    name: 'Leave',
    component: Leave,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },

  {
    // catches 404 errors
    path: '*',
    name: '404',
    component: NotFound,
  },

  // dynamic segement `:microcosm` is added to the path
  {
    path: '/microcosm/:microcosm',
    component: List,
  },
]

const router = new VueRouter({
  mode: 'history',
  //base: 'https://alpha.nodenogg.in/',
  //base: process.env.VUE_APP_HTTP + '://' + process.env.VUE_APP_URL + '',
  //base: process.env.VUE_APP_HTTP,
  routes,
})


export default router
