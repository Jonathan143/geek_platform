import Vue from 'vue'
import Router from 'vue-router'
import LayoutMain from '@/layout/main'

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
      component: () => import(/* webpackChunkName: "login" */ 'views/login')
    },
    {
      path: '/overview',
      component: LayoutMain,
      children: [
        {
          path: '',
          name: 'overview',
          component: () =>
            import(/* webpackChunkName: "home" */ 'views/overview')
        }
      ]
    },
    {
      path: '/mzitu',
      component: LayoutMain,
      children: [
        {
          path: '',
          name: 'mzitu',
          component: () =>
            import(/* webpackChunkName: "mzitu" */ 'views/mzitu/cardView')
        }
      ]
    },
    {
      path: '/file',
      component: LayoutMain,
      children: [
        {
          path: '',
          name: 'file',
          component: () => import(/* webpackChunkName: "file" */ 'views/file')
        }
      ]
    },
    {
      path: '/reptile',
      component: LayoutMain,
      children: [
        {
          path: '',
          name: 'reptile',
          component: () =>
            import(/* webpackChunkName: "reptile" */ 'views/reptile')
        }
      ]
    },
    {
      path: '/user',
      component: LayoutMain,
      children: [
        {
          path: 'management',
          name: 'userManagement',
          component: () =>
            import(/* webpackChunkName: "file" */ 'views/user/userManagement')
        }
      ]
    }
  ]
})
