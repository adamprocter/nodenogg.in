import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // this will be objects containing arrays of all the handles / connections and nodes
    configConnect: {
      x: -25,
      y: -25,
      height: 50,
      width: 50,
      fill: 'rgb(200, 0, 0)'
    },
    configHandle: {
      x: 25,
      y: 25,
      height: 10,
      width: 10,
      fill: 'black'
    },
    configNodes: [
      { id: 1, text: 'node 1' },
      { id: 2, text: 'node 2' },
      { id: 3, text: 'node 3' }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
})
