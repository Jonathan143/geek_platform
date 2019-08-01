export default [
  {
    path: 'home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/main/home/index.vue')
  }
]
