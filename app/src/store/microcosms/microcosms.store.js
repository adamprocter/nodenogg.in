import { get } from '@ngard/tiny-get'

import store from '..'
import * as storage from '@/utils/storage'
import { addToHistory, isMicrocosmRoute } from './utils'
import { MicrocosmInstanceManager } from './MicrocosmInstanceManager'

import { STORE_PREFIX, STORE_CHILD_PREFIX } from './constants'

export const microcosmManager = new MicrocosmInstanceManager({
  module: STORE_PREFIX,
  child: STORE_CHILD_PREFIX,
})

export const microcosmStoreTemplate = (microcosm_id) => {
  return {
    state: {
      microcosm_id,
      nodes: [],
    },
    mutations: {
      SET_NODES(state, nodes) {
        state.nodes = nodes
      },
      CREATE_NODE(state, newNode) {
        state.nodes = [...state.nodes, newNode]
      },
    },
    namespaced: true,
  }
}

const remote = {
  domain: 'localhost:5984',
  username: 'auto-admin',
  password: 'testing',
  secure: false
}

export const microcosmsStore = {
  namespaced: true,
  state: {
    loading: true,
    routerParams: {},
    history: storage.get('microcosms/history', {}),
  },
  modules: {
    stores: {},
  },
  getters: {
    getNodes: (state) => (microcosm_id) => {
      return get(state, [STORE_CHILD_PREFIX, microcosm_id, 'nodes'], [])
    },
    getNode: (state) => (microcosm_id, node_id) => {
      const activeMicrocosmNodes = get(
        state,
        [STORE_CHILD_PREFIX, microcosm_id, 'nodes'],
        null
      )
      return (
        activeMicrocosmNodes &&
        activeMicrocosmNodes.find((node) => node.node_id === node_id)
      )
    },
    getMicrocosmFromRoute: (state) => {
      const activeMicrocosm = get(state, 'routerParams.microcosm_id', null)
      return (
        activeMicrocosm &&
        get(state, [STORE_CHILD_PREFIX, activeMicrocosm], null)
      )
    },
    getNodeFromRoute: (state) => {
      const activeMicrocosm = get(state, 'routerParams.microcosm_id', null)
      const activeNode = get(state, 'routerParams.node_id', null)
      const activeMicrocosmNodes = get(
        state,
        [STORE_CHILD_PREFIX, activeMicrocosm, 'nodes'],
        null
      )

      return (
        activeMicrocosmNodes &&
        activeMicrocosmNodes.find((node) => node.node_id === activeNode)
      )
    },
  },
  mutations: {
    ADD_TO_HISTORY: (state, microcosmHistoryEvent) => {
      state.history = addToHistory(state.history, microcosmHistoryEvent)
    },
    CLEAR_HISTORY: (state) => {
      state.history = []
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading
    },
    UPDATE_ROUTER_PARAMS(state, { params }) {
      state.routerParams = params
    },
  },
  actions: {
    addToHistory({ commit, state }, microcosmHistoryEvent) {
      commit('ADD_TO_HISTORY', microcosmHistoryEvent)
      storage.set('microcosms/history', state.history)
    },
    clearHistory({ commit }) {
      commit('CLEAR_HISTORY')
      storage.set('microcosms/history', [])
    },
    createNode({ commit }, { microcosm_id, newNode }) {
      commit(`${microcosm_id}/CREATE_NODE`, newNode)
    },
    createNodeFromRoute({ commit, state }, newNode) {
      const activeMicrocosm = get(state, 'routerParams.microcosm_id', null)
      if (activeMicrocosm) {
        commit(`${activeMicrocosm}/CREATE_NODE`, newNode)
      }
    },
    handleRouteChange: async ({ commit }, to) => {
      // check to see if we're going to a valid :microcosm_id route
      if (isMicrocosmRoute(to)) {
        const { microcosm_id, view } = to.params

        await microcosmManager
          .add(microcosm_id, { remote })
          .then((isExistingInstance) => {
            // add this event to our microcosm history 
            store.dispatch('microcosms/addToHistory', { microcosm_id, data: { view } })

            // if this is the first time we've connected to this instance
            // register a VueX store module to handle this microcosm
            if (!isExistingInstance) {
              registerMicrocosmStore(microcosm_id)
            }
          })

        await microcosmManager
          .get(microcosm_id)
          .then((instance) => {
            store.dispatch('microcosms/addToHistory', { microcosm_id, data: { remote } })
            instance.setRemote(remote)
          })
      }
      commit('UPDATE_ROUTER_PARAMS', to)
      commit('SET_LOADING', false)
    },
  },
}

const registerMicrocosmStore = (microcosm_id) => {
  store.registerModule(
    [STORE_PREFIX, STORE_CHILD_PREFIX, microcosm_id],
    microcosmStoreTemplate(microcosm_id)
  )
}

export const unregisterMicrocosmStore = async (microcosm_id) => {
  await microcosmManager.unregisterMicrocosm(microcosm_id).then(() => {
    store.unregisterModule([STORE_PREFIX, STORE_CHILD_PREFIX, microcosm_id])
  })
}
