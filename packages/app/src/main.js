import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ComponentLibrary from '@nodenogg.in/components'

Vue.config.productionTip = false

Vue.use(ComponentLibrary)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
