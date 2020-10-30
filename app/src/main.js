import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import files1 from './assets/files/cute_monkey.jpg'
import files2 from './assets/files/collect.png'
// import files from './assets/files/logo_nt.jpg'
// import files from './assets/files/logo_nt.png'

// FIXME: Probably update this to the global import code from Vue
// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
import BaseButton from './components/BaseButton.vue'
import Icon from '@/experimental/icons/Icon'

Vue.component('BaseButton', BaseButton)
Vue.component('Icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  files1,
  files2,
  render: (h) => h(App),
}).$mount('#app')
