import $axios from './api'

export function reFetchFileList(path) {
  return $axios({
    api: 'file',
    param: { path }
  })
}
