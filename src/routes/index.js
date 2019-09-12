import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routerContex = require.context('./', true, /.js$/)
let mainChildren = [
  {
    path: 'file',
    name: 'file',
    component: () => import(/* webpackChunkName: "file" */ '@/views/main/file')
  }
]

for (const router of routerContex.keys()) {
  if (!router.startsWith('./index')) {
    let routerModule = routerContex(router)
    mainChildren = [...mainChildren, ...(routerModule.default || routerModule)]
  }
}

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      path: '/main',
      name: 'main',
      redirect: { name: 'home' },
      component: () =>
        import(/* webpackChunkName: "main" */ '@/views/main/index.vue'),
      children: mainChildren
    }
  ]
})
