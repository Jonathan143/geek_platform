const children = [
  {
    path: 'usermanagement',
    name: 'userManagement',
    component: () => import('@/views/main/user/usermanagement')
  }
]

export default [
  {
    path: 'user',
    redirect: { name: 'userManagement' },
    component: () => import(/* webpackChunkName: "user" */ '@/views/main/user'),
    children
  }
]
