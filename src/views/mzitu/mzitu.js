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
      }
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
      const { sourceUrl, isDownload, children, title } = mzi
      const messageText = isDownload ? '下载' : '上传服务器'

      if (this.isDownloading) {
        this.$notify.success(`正在${messageText}中...`)
      } else {
        this.isDownloading = true
        this.$notify.success(`开始${messageText}...`)
        try {
          isDownload
            ? this.handleBatchDownload({
                fileList: children,
                zipName: title,
                zipSuccess: () => {
                  this.isDownloading = false
                  this.$notify.success(`${title}打包zip成功`)
                }
              })
            : reFetchAlbumUrls(sourceUrl).then(({ srcList }) => {
                this.reSaveToServer(srcList, mzi)
              })
        } catch (error) {
          this.$notify.error(`${messageText}失败咯`)
          this.isDownloading = false
        }
      }
    },

    onMoreLoad() {
      this.reFindMzitu()
    },

    reSaveToServer(urls, mzi) {
      const { title, date } = mzi
      reSaveMzituAlbum(urls, title, date).then(data => {
        mzi.isDownload = true
        mzi.children = data
        this.isDownloading = false
        this.$notify.success('上传服务器成功')
      })
    }
  }
}
