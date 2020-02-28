import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

import './plugins/antd.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
