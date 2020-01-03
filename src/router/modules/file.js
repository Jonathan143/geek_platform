import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/file',
  name: 'file',
  meta,
  redirect: { name: 'fileIndex' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}Index`,
      component: _import('file'),
      meta: { ...meta, title: '文件', cache: true }
    },
    {
      path: 'cos',
      name: `${pre}Cos`,
      component: _import('file/cos'),
      meta: { ...meta, title: '对象存储' }
    }
  ])('file')
}
