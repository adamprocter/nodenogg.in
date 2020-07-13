import { STORE_PREFIX, STORE_CHILD_PREFIX } from './constants'

const microcosmStoreTemplate = (microcosm_id) => {
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

export const registerMicrocosmStore = (store, microcosm_id) => {
  store.registerModule(
    [STORE_PREFIX, STORE_CHILD_PREFIX, microcosm_id],
    microcosmStoreTemplate(microcosm_id)
  )
}

export const unregisterMicrocosmStore = (store, microcosm_id) => {
  store.unregisterModule([STORE_PREFIX, STORE_CHILD_PREFIX, microcosm_id])
}
