import $axios from '@/plugin/axios'

// 获取某个专辑的所有图片链接
export function reFetchAlbumUrls(url) {
  return $axios({
    api: 'mzitu/album_urls',
    param: { url }
  })
}

export function reSaveMzituAlbum(urls, title, date) {
  return $axios({
    method: 'post',
    api: 'mzitu/download',
    param: { urls, title, date }
  })
}

export function reFetchMzituCategoryList() {
  return $axios({
    api: 'mzitu/get_category_list',
    param: {}
  })
}

export function reFetchMzitu({ type, content, page }) {
  return $axios({
    api: 'mzitu',
    param: {
      type,
      content,
      page
    }
  })
}

export function reFetchMzituFromDataBase({
  nameLike,
  id,
  pageSize,
  pageIndex,
  isDownload
}) {
  return $axios({
    api: 'mzitu/get_mziFromDataBase',
    param: {
      nameLike,
      id,
      pageSize,
      pageIndex,
      isDownload
    }
  })
}

export const headers = pageUrl => {
  return {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    Host: 'i5.meizitu.net',
    Pragma: 'no-cache',
    'Proxy-Connection': 'keep-alive',
    Referer: pageUrl,
    'Upgrade-Insecure-Requests': 1,
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36'
  }
}
