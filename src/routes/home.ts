export default [
  {
    path: 'home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/main/home/index.vue')
  },
  {
    path: 'mzitu',
    name: 'mzitu',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/main/mzitu/index.vue')
  }
]
