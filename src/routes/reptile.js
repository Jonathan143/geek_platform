const children = []

export default [
  {
    path: 'reptile',
    name: 'reptile',
    component: () =>
      import(/* webpackChunkName: "reptile" */ '@/views/main/reptile')
  }
]
