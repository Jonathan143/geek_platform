import FileSaver from 'file-saver'
import axios from '@/plugin/axios'
import JSZip from 'jszip'
import { isArray } from 'lodash'

try {
  var isFileSaverSupported = !!new Blob()
} catch (e) {
  console.error('不支持 Blob 格式')
}

export const download = (data, name) => {
  if (!isFileSaverSupported) return
  FileSaver.saveAs(data, name)
}

/**
 * 格式化文件大小
 * @param number size 文件大小
 * @param number index 传入大小为哪个单位的 0为 B (字节)
 */
export function formatFileSize(size, index = 0) {
  const unitList = ['B', 'KB', 'MB', 'GB', 'PB']
  let i = index
  while (size / 1024 > 1) {
    size /= 1024
    i++
  }
  return size.toFixed(2) + unitList[i]
}

export const getFile = ({ url, headers, onDownloadProgress }) => {
  return new Promise((resolve, reject) => {
    const config = {
      api: url,
      responseType: 'arraybuffer',
      timeout: 0
    }
    headers ? (config.headers = headers) : ''
    onDownloadProgress ? (config.onDownloadProgress = onDownloadProgress) : ''

    axios(config)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error.toString())
      })
  })
}

//批量下载
export const handleBatchDownload = async ({
  fileList,
  zipName,
  headers,
  zipSuccess = () => {
    console.log('zip success')
  },
  downloadSuccess = () => {
    console.log('download success')
  },
  onDownloadProgress
}) => {
  const zip = new JSZip()
  const cache = {}
  const promises = []
  await fileList.forEach((item, index) => {
    const h = isArray(headers) ? headers[index] : headers
    const promise = getFile({ url: item, headers: h, onDownloadProgress }).then(
      data => {
        // 下载文件, 并存成ArrayBuffer对象
        const arr_name = item.split('/')
        let file_name = arr_name[arr_name.length - 1] // 获取文件名

        zip.file(file_name, data, {
          binary: true
        }) // 逐个添加文件
        cache[file_name] = data
      }
    )
    promises.push(promise)
  })
  Promise.all(promises).then(() => {
    downloadSuccess()
    zip
      .generateAsync({
        type: 'blob'
      })
      .then(content => {
        download(content, zipName) // 利用file-saver保存文件
        zipSuccess()
      })
  })
}
