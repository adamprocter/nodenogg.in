export const routerStore = {
  namespaced: true,
  state: {
    name: null,
    fullPath: null,
    params: {},
  },
  mutations: {
    UPDATE(state, { name, fullPath, params }) {
      state.name = name
      state.fullPath = fullPath
      state.params = params
    },
  },
  actions: {
    update: async ({ commit }, to) => {
      commit(`router/UPDATE`, to)
    },
  },
}

export const init = (router, store) => {
  router.afterEach((to) => store.dispatch('router/update', to))
}
