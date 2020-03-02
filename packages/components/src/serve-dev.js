import Vue from 'vue';
import Dev from '@/serve-dev.vue';
import ComponentLibrary from "@nodenogg.in/components"

Vue.config.productionTip = false;

Vue.use(ComponentLibrary)

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
