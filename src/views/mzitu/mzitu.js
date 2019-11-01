import { reFetchAlbumUrls, reSaveMzituAlbum } from '@/api/mzitu'
import batchDownload from '@/mixins/batchDownload'

export default {
  data() {
    return {
      isLoading: false,
      isDownloading: false,
      page: {
        index: 1,
        total: 0
      },
      isDownloadModule: true
    }
  },

  mixins: [batchDownload],

  methods: {
    initReData() {
      this.page.index = 1
      this.mzituList = []
      this.reFindMzitu()
    },

    onRightTopIconClick(mzi) {
      const { sourceUrl } = mzi
      if (this.isDownloading) {
        this.$message.success('正在下载中...')
      } else {
        this.isDownloading = true
        reFetchAlbumUrls(sourceUrl).then(({ srcList }) => {
          this.$message.success('开始下载...')
          this.isDownloadModule
            ? this.batchDownload(srcList, mzi.title)
            : this.reSaveToServer(srcList, mzi)
        })
      }
    },

    onMoreLoad() {
      this.reFindMzitu()
    },

    batchDownload(srcList, zipName) {
      const fileList = srcList.map(item => item.imageUrl)
      const headers = srcList.map(item => item.pageUrl)
      debugger
      this.handleBatchDownload({
        fileList,
        headers,
        zipName
      })
    },

    reSaveToServer(urls, mzi) {
      const { title, date } = mzi
      reSaveMzituAlbum(urls, title, date)
        .then(data => {
          this.isDownloading = false
          mzi.isDownload = true
          mzi.children = data
          this.$message.success('下载成功')
        })
        .catch(() => {
          this.$message.error('下载失败咯')
          this.isDownloading = false
        })
    }
  }
}
