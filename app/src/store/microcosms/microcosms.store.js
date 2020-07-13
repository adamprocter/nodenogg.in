import { get } from '@ngard/tiny-get'

import store from '@/store'
import {
  registerMicrocosmStore,
  unregisterMicrocosmStore,
} from './microcosm.store'
import { MicrocosmInstanceManager } from './MicrocosmInstanceManager'

import * as storage from '@/utils/storage'
import { updateHistory, isMicrocosmRoute } from './utils'
import { STORE_PREFIX, STORE_CHILD_PREFIX } from './constants'

export const microcosmManager = new MicrocosmInstanceManager({
  module: STORE_PREFIX,
  child: STORE_CHILD_PREFIX,
})

const remote = {
  domain: 'localhost:5984',
  username: 'auto-admin',
  password: 'testing',
  secure: false,
}

export const microcosmsStore = {
  namespaced: true,
  state: {
    ready: false,
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
    ready: (state) => {
      return !!state.routerParams.microcosm_id
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
    getMicrocosmHistoryFromRoute: (state) => {
      const activeMicrocosm = get(state, 'routerParams.microcosm_id', null)
      return activeMicrocosm && state.history[activeMicrocosm]
    },
    getMicrocosmBaseRoute: (state) => {
      const activeMicrocosm = get(state, 'routerParams.microcosm_id')
      const activeView = get(state, 'routerParams.view')
      return (
        activeMicrocosm && activeView && `/dev/${activeMicrocosm}/${activeView}`
      )
    },
  },
  mutations: {
    UPDATE_HISTORY: (state, microcosmHistoryEvent) => {
      state.history = updateHistory(state.history, microcosmHistoryEvent)
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
      commit('UPDATE_HISTORY', microcosmHistoryEvent)

      // sync history with local storage
      storage.set('microcosms/history', state.history)
    },
    clearHistory({ commit }) {
      commit('CLEAR_HISTORY')

      // sync history with local storage
      storage.set('microcosms/history', [])
    },
    createNode: async ({ commit, dispatch }, { microcosm_id, newNode }) => {
      commit(`${microcosm_id}/CREATE_NODE`, newNode)
      // add edit
      dispatch('addToHistory', { microcosm_id, edit: true })
    },
    createNodeFromRoute: async ({ commit, state, dispatch }, newNode) => {
      try {
        // check if the route contains a microcosm_id
        const activeMicrocosm = get(state, 'routerParams.microcosm_id', null)
        if (activeMicrocosm) {
          commit(`${activeMicrocosm}/CREATE_NODE`, newNode)

          const instance = await microcosmManager.get(activeMicrocosm)
          instance.update(newNode)

          dispatch('addToHistory', {
            microcosm_id: activeMicrocosm,
            edit: true,
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleRouteChange: async ({ commit, dispatch }, to) => {
      // check to see if we're going to a valid :microcosm_id route
      if (isMicrocosmRoute(to)) {
        const { microcosm_id, view } = to.params

        await microcosmManager
          .add(microcosm_id, { remote })
          .then((isExistingInstance) => {
            // add this event to our microcosm history
            dispatch('addToHistory', {
              microcosm_id,
              data: { view, remote },
            })

            // if this is the first time we've connected to this instance
            // register a VueX store module to handle this microcosm
            if (!isExistingInstance) {
              registerMicrocosmStore(store, microcosm_id)
            }
          })
      }
      commit('UPDATE_ROUTER_PARAMS', to)
      commit('SET_LOADING', false)
    },
  },
}

// microcosmManager
//   .get(microcosm_id)
//   .then(instance => {
//     instance.update({ data: 'update' })
//   })
//   .catch(err => {
//     console.log(err)
//   })

// try {
//   const instance = await microcosmManager.get(microcosm_id)
//   instance.update({ data: 'update' })
// } catch (e) {
//   console.log(e)
// }

export const unregisterMicrocosm = async (microcosm_id) => {
  await microcosmManager.unregisterMicrocosm(microcosm_id).then(() => {
    unregisterMicrocosmStore(store, microcosm_id)
  })
}

export const init = (router, store) =>
  router.afterEach((to) => {
    store.dispatch(`${STORE_PREFIX}/handleRouteChange`, to)
  })
