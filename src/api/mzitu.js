import $axios from './api'

// 获取某个专辑的所有图片链接
export function reFetchAlbumUrls(url) {
  return $axios({
    api: 'mzitu/album_urls',
    param: { url }
  })
}

export function reSaveMzituAlbum(urls, name, date) {
  return $axios({
    method: 'post',
    api: 'mzitu/download',
    param: { urls, name, date },
    isLoading: false
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

export function reFetchMzituByTitle({ nameLike, id, pageSize, pageIndex }) {
  return $axios({
    api: 'mzitu/get_mziFromDataBase',
    param: {
      nameLike,
      id,
      pageSize,
      pageIndex
    }
  })
}
