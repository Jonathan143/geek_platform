import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import './plugins/element'
import callApi from './api'
import vuetify from './plugins/vuetify'

Vue.prototype.$callApi = callApi

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
