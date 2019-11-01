import { sum } from 'lodash'
import { handleBatchDownload } from '@/libs/util.file'

export default {
  data() {
    return {
      totalSizes: {},
      downloadSizes: {}
    }
  },
  computed: {
    downloadTotalPercentage() {
      const [totalSize, downloadSize] = [
        sum(Object.values(this.totalSizes)),
        sum(Object.values(this.downloadSizes))
      ]

      return Math.ceil((downloadSize / totalSize) * 100) || 0
    }
  },
  methods: {
    onDownloadProgress() {
      return progressEvent => {
        const { loaded, total, currentTarget } = progressEvent
        const arr_name = currentTarget.responseURL.split('/')
        const file_name = arr_name[arr_name.length - 1] // 获取文件名

        this.$set(this.downloadSizes, file_name, loaded)
        this.$set(this.totalSizes, file_name, total)
      }
    },

    /**
     *
     * @param {Object} config 配置项
     */
    handleBatchDownload(config) {
      handleBatchDownload({
        ...config,
        onDownloadProgress: this.onDownloadProgress()
      })
    }
  }
}
