import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// FIXME: Probably update this to the global import code from Vue
// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
import BaseButton from './components/BaseButton.vue'
Vue.component('BaseButton', BaseButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
