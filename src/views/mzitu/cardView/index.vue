<template>
  <d2-container>
    <template #header>
      <el-select v-model="currentCategory"
        @change="onCategoryChange"
        placeholder="请选择分类">
        <el-option v-for="category in categoryList"
          :key="category.value"
          :label="category.label"
          :value="category.value">
        </el-option>
      </el-select>
      <el-input placeholder="搜索妹子"
        prefix-icon="el-icon-search"
        v-model="searchMzitu"
        clearable
        @keydown.enter.native="initReData">
      </el-input>

      <el-button icon="el-icon-refresh-left"
        :loading="isLoading"
        circle
        @click="initReData" />
    </template>

    <card-view v-model="isLoading"
      :data="mzituList"
      :total-count="666"
      @load="onMoreLoad"
      @right-top-icon-click="onRightTopIconClick">
      <template #default="mzitu">
        <el-tooltip class="item"
          effect="dark"
          :content="`在线预览：${mzitu.sourceUrl}`"
          placement="top">
          <el-link class="content__title"
            :href="mzitu.sourceUrl"
            :underline="false"
            target="_blank"><i class="el-icon-view el-icon--right"></i>
            {{ mzitu.title }}</el-link>
        </el-tooltip>
      </template>
    </card-view>
  </d2-container>
</template>

<script>
import {
  reFetchAlbumUrls,
  reSaveMzituAlbum,
  reFetchMzituCategoryList,
  reFetchMzitu
} from '@/api/mzitu'
import mzitu from '../mzitu'
export default {
  name: 'mzituIndex',
  components: {
    CardView: () => import('../components/CardView')
  },
  mixins: [mzitu],
  data() {
    return {
      currentCategory: '',
      categoryList: [],
      searchMzitu: '',
      mzituList: [],
      isDownloading: false,
      isLoading: false,
      page: {
        index: 1,
        total: 0
      }
    }
  },

  methods: {
    onCategoryChange() {
      this.searchMzitu = ''
      this.initReData()
    },

    reFindCategoryList() {
      reFetchMzituCategoryList().then(data => {
        this.categoryList = data
      })
    },

    reFindMzitu() {
      this.isLoading = true
      reFetchMzitu({
        type: this.currentCategory,
        content: this.searchMzitu,
        page: this.page.index
      }).then(data => {
        if (data.length) {
          this.mzituList = [...this.mzituList, ...data]
          this.page.index++
          this.page.total = this.mzituList.length
        }
        this.isLoading = false
      })
    }
  },

  watch: {
    searchMzitu(val, oldval) {
      if (oldval && !val) {
        this.initReData()
      }
    }
  },

  mounted() {
    this.reFindCategoryList()
  }
}
</script>

<style lang="scss" scoped>
.content__title {
  color: #fff;
}
</style>
