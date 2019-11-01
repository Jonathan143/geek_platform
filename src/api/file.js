import $axios from '@/plugin/axios'

export function reFetchFileList(path) {
  return $axios({
    api: 'file',
    param: { path }
  })
}
