import $axios from '@/plugin/axios'

// 获取文件列表
export function reFetchFileList(path) {
  return $axios({
    api: 'file',
    param: { path }
  })
}

// 获取存储桶列表
export function reFetchBucketList(path) {
  return $axios({
    api: 'cos/bucket'
  })
}

// 获取cos临时密钥
export function reFetchCosCredential(path) {
  return $axios({
    api: 'cos/credential'
  })
}
