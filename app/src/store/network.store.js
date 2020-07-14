import { isClient } from '@/utils'

export const networkStore = {
  namespaced: true,
  state: {
    online: false,
  },
  mutations: {
    UPDATE_ONLINE_STATUS: (state, connectionOnline) => {
      state.online = connectionOnline
    },
  },
  actions: {
    updateOnlineStatus: async ({ commit }, online) => {
      commit(`UPDATE_ONLINE_STATUS`, online)
    },
  },
}

export const init = (store) => {
  const updateOnlineStatus = () => {
    store.dispatch('network/updateOnlineStatus', navigator.onLine)
  }

  if (navigator && isClient) {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }

  updateOnlineStatus()
}
