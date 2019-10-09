<template>
  <div>
    <card-view v-model="isLoading"
      :data="mzituList"
      :total-count="666"
      @load="onMoreLoad"
      @right-top-icon-click="onDownlloadAllPicClick"></card-view>

    <dialog-image :visible.sync="isDialogImage.visible"
      :title="isDialogImage.title"
      :urls="isDialogImage.urlList"
      width="60%"></dialog-image>
  </div>
</template>

<script>
import {
  reFetchMzituByTitle,
  reFetchAlbumUrls,
  reSaveMzituAlbum
} from 'api/mzitu'
export default {
  components: {},
  props: {},
  data() {
    return {
      searchMzitu: '',
      mzituList: [],
      isLoading: false,
      isDownloading: false,
      page: {
        index: 1,
        total: 0
      },
      isDialogImage: {
        visible: false,
        title: '',
        urlList: []
      }
    }
  },
  computed: {},
  methods: {
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
      this.reFindMzitu()
    },

    reFindMzitu() {
      this.isLoading = true
      reFetchMzituByTitle({
        nameLike: this.searchMzitu
      }).then(data => {
        if (data.length) {
          this.mzituList = [...this.mzituList, ...data]
          this.page.index++
          this.page.total = this.mzituList.length
        }
        this.isLoading = false
      })
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
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
