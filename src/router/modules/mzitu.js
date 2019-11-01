import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/mzitu',
  name: 'mzitu',
  meta,
  redirect: { name: 'mzituIndex' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}Index`,
      component: _import('mzitu/cardView'),
      meta: { ...meta, title: '妹子图首页', cache: true }
    },
    {
      path: 'download/preview',
      name: `${pre}DownloadPreview`,
      component: _import('mzitu/downloadPreview'),
      meta: { ...meta, title: '下载预览', cache: true }
    }
  ])('mzitu')
}
