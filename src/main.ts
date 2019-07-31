import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import './plugins/element.js'
import callApi from './api'

Vue.prototype.$callApi = callApi

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
