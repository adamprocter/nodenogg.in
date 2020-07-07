export const routerStore = {
  namespaced: true,
  state: {
    name: null,
    fullPath: null,
    params: {},
  },
  mutations: {
    update(state, { name, fullPath, params }) {
      state.name = name
      state.fullPath = fullPath
      state.params = params
    },
  },
}

export const connectRouterToStore = (router, store) =>
  router.afterEach((to) => store.commit('router/update', to))
