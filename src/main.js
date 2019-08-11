import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/inject'

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
