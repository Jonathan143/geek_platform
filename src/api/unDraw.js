import $axios from '@/plugin/axios'

// 拉取
export function pullUnDraw(pageIndex) {
  return $axios({
    api: `other/draw/pull/${pageIndex}`
  })
}

// 拉取
export function fetchUnDraw({ pageIndex = 1, pageSize = 20, nameLike, id }) {
  return $axios({
    api: 'other/draw',
    param: { pageIndex, pageSize, nameLike, id }
  })
}
