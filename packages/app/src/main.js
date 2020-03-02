import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ComponentLibrary from '@nodenogg.in/components'
import NodeEditor from '@nodenogg.in/node-editor'

Vue.config.productionTip = false

Vue.use(ComponentLibrary)
Vue.use(NodeEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
