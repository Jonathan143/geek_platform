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
        },
        {
          path: 'file',
          name: 'file',
          component: () =>
            import(/* webpackChunkName: "file" */ './views/main/file')
        },
        {
          path: 'reptile',
          name: 'reptile',
          component: () =>
            import(/* webpackChunkName: "reptile" */ './views/main/reptile')
        },
        {
          path: 'usermanagement',
          name: 'userManagement',
          component: () =>
            import(/* webpackChunkName: "userManagement" */ './views/main/user')
        }
      ]
    }
  ]
})
