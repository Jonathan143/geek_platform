<template>
  <d2-container>
    <template #header>
      <el-select v-model="dataSource"
        placeholder="请选择"
        @change="onDataSourceChange">
        <el-option v-for="item in dataOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input placeholder="搜索妹子"
        prefix-icon="el-icon-search"
        v-model="searchMzitu"
        clearable
        @keydown.enter.native="onDataSourceChange">
      </el-input>

      <el-button icon="el-icon-refresh-left"
        :loading="isLoading"
        circle
        @click="onDataSourceChange" />
    </template>

    <card-view v-model="isLoading"
      :data="mzituList"
      :total-count="page.total"
      @load="onMoreLoad"
      @right-top-icon-click="onRightTopIconClick"
      @card-click="onCardClick" />

    <dialog-image :visible.sync="isDialogImage.visible"
      :title="isDialogImage.title"
      :urls="isDialogImage.urlList"
      width="60%"></dialog-image>
  </d2-container>
</template>

<script>
import {
  reFetchMzituFromDataBase,
  reFetchAlbumUrls,
  reSaveMzituAlbum
} from '@/api/mzitu'
import mzitu from '../mzitu'
export default {
  name: 'mzituDownloadPreview',
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
        total: 1
      },
      isDialogImage: {
        visible: false,
        title: '',
        urlList: []
      },
      dataOptions: [
        {
          value: 0,
          label: '所有妹子'
        },
        {
          value: true,
          label: '已下载'
        },
        {
          value: false,
          label: '未下载'
        }
      ],
      dataSource: 0,
      backupMzituList: []
    }
  },
  mixins: [mzitu],
  computed: {},
  methods: {
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

    onDataSourceChange() {
      this.page.index = 1
      this.mzituList = []
      this.reFindMzitu()
    },

    reFindMzitu() {
      this.isLoading = true
      const { index, size } = this.page
      reFetchMzituFromDataBase({
        nameLike: this.searchMzitu,
        pageSize: size,
        pageIndex: index,
        isDownload: this.dataSource
      }).then(({ mziList, total }) => {
        if (mziList.length) {
          this.mzituList = [...this.mzituList, ...mziList]
          this.page.index++
        }
        this.page.total = total
        this.isLoading = false
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
