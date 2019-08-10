import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import(/* webpackChunkName: "main" */ './views/main'),
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () =>
            import(/* webpackChunkName: "home" */ './views/main/home')
        },
        {
          path: 'mzitu',
          name: 'mzitu',
          component: () =>
            import(/* webpackChunkName: "mzitu" */ './views/main/mzitu')
        }
      ]
    }
  ]
})
