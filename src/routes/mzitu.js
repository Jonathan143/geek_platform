const children = [
  {
    path: 'cardView',
    name: 'mzituCardView',
    component: () => import('@/views/main/mzitu/cardView')
  }
]

export default [
  {
    path: 'mzitu',
    name: 'mzitu',
    redirect: { name: 'mzituCardView' },
    component: () =>
      import(/* webpackChunkName: "mzitu" */ '@/views/main/mzitu'),
    children
  }
]
