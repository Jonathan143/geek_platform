import {
  reFetchMzituByTitle,
  reFetchAlbumUrls,
  reSaveMzituAlbum
} from 'api/mzitu'
export default {
  data() {
    return {
      isLoading: false,
      isDownloading: false,
      page: {
        index: 1,
        total: 0
      }
    }
  },

  methods: {
    initReData() {
      this.page.index = 1
      this.mzituList = []
      this.reFindMzitu()
    },

    onDownlloadAllPicClick({ sourceUrl, name, date }) {
      if (this.isDownloading) {
        this.$message.success('服务器正在下载中...')
      } else {
        this.isDownloading = true
        reFetchAlbumUrls(sourceUrl).then(data => {
          this.$message.success('开始下载...')
          this.reSaveDownload(data.srcList, name, date)
        })
      }
    },

    onMoreLoad() {
      // this.reFindMzitu()
    },

    reSaveDownload(urls, name, date) {
      reSaveMzituAlbum(urls, name, date)
        .then(data => {
          this.$message.success('下载成功')
          this.isDownloading = false
        })
        .catch(() => {
          this.$message.error('下载失败咯')
          this.isDownloading = false
        })
    }
  }
}
