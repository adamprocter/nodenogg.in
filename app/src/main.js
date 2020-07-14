import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import files from './assets/files/cute_monkey.jpg'
import { init as initMicrocosmStore } from './store/microcosms/microcosms.store'
import { init as initNetworkStore } from './store/network.store'

import BaseButton from './components/BaseButton.vue'
import Icon from '@/experimental/icons/Icon'

Vue.component('BaseButton', BaseButton)
Vue.component('Icon', Icon)

Vue.config.productionTip = false

initMicrocosmStore(router, store)
initNetworkStore(store)

new Vue({
  router,
  store,
  files,
  render: (h) => h(App),
}).$mount('#app')
