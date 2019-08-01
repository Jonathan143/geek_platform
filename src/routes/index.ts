import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routerContex: any = require.context('./', true, /.ts$/)
let mainChildren: Array<any> = []

for (const router of routerContex.keys()) {
  if (!router.startsWith('./index')) {
    let routerModule: any = routerContex(router)
    mainChildren = [...mainChildren, ...(routerModule.default || routerModule)]
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/main'
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
      component: () =>
        import(/* webpackChunkName: "main" */ '@/views/main/index.vue'),
      children: mainChildren
    }
  ]
})
