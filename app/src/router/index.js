import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../routes/Home.vue'
import List from '../routes/List.vue'
// import Oldhome from '../routes/Oldhome'
//import Test from '../routes/Test'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: List,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../routes/About.vue'),
  },

  // {
  //   path: '/test',
  //   name: 'IPFS Test',
  //   component: Test,
  // },
  // {
  //   path: '/oldhome',
  //   name: 'Old Home',
  //   component: Oldhome,
  // },
  {
    path: '/dev',
    name: 'index',
    component: () => import('@/routes/dev/index.vue'),
  },
  {
    path: '/dev/:microcosm_id',
    name: 'microcosm',
    component: () => import('@/routes/dev/microcosm.vue'),
    children: [
      {
        name: 'microcosm.view',
        path: ':view',
        children: [
          {
            name: 'microcosm.view.node',
            path: ':node_id',
          },
        ],
      },
    ],
  },
  {
    path: '/microcosm/:microcosm',
    component: Home,
  },

  {
    // catches 404 errors
    path: '*',
    name: '404',
    component: () => import('../routes/NotFound.vue'),
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
