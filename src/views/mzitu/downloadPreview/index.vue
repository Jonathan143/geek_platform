<template>
  <div>
    <card-view v-model="isLoading"
      :data="mzituList"
      :total-count="666"
      @load="onMoreLoad"
      @right-top-icon-click="onDownlloadAllPicClick"
      @card-click="onCardClick" />

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
  components: { CardView: () => import('../components/CardView') },
  props: {},
  data() {
    return {
      searchMzitu: '',
      mzituList: [],
      isLoading: false,
      isDownloading: false,
      page: {
        index: 1,
        size: 20,
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
    onDownlloadAllPicClick(mzi) {
      const { sourceUrl } = mzi
      if (this.isDownloading) {
        this.$message.success('服务器正在下载中...')
      } else {
        this.isDownloading = true
        reFetchAlbumUrls(sourceUrl).then(data => {
          this.$message.success('开始下载...')
          this.reSaveDownload(data.srcList, mzi)
        })
      }
    },

    onCardClick(mzi) {
      const { title, children } = mzi
      if (mzi.isDownload) {
        this.isDialogImage = {
          visible: true,
          title,
          urlList: children
        }
      } else {
        this.$message({
          showClose: true,
          message: `妹子图（${title}）未下载`
        })
      }
    },

    onMoreLoad() {
      this.reFindMzitu()
    },

    reFindMzitu() {
      this.isLoading = true
      const { index, size } = this.page
      reFetchMzituByTitle({
        nameLike: this.searchMzitu,
        pageSize: size,
        pageIndex: index
      }).then(({ mziList, total }) => {
        if (mziList.length) {
          this.mzituList = [...this.mzituList, ...mziList]
          this.page.index++
          this.page.total = total
        }
        this.isLoading = false
      })
    },

    reSaveDownload(urls, mzi) {
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
  },
  mounted() {
    // this.reFindMzitu()
  }
}
</script>

<style lang="scss" scoped>
</style>
