import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Store from 'store'
import expirePlugin from 'store/plugins/expire'
import callApi from './api'
import './plugins/element'

Vue.prototype.$callApi = callApi
Store.addPlugin(expirePlugin)
window.Store = Store

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeResolve((to, from, next) => {
  store.dispatch('user/syncUser')
  next()
})

router.afterEach((to, from) => {
  if (!Cookies.get('token')) router.replace({ name: 'login' })
})
