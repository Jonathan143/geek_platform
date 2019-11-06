import $axios from '@/plugin/axios'

// 获取文件列表
export function reFetchFileList(path) {
  return $axios({
    api: 'file',
    param: { path }
  })
}
