const children = []

export default [
  {
    path: 'home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/main/home'),
    children
  }
]
