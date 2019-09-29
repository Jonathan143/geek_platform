<template>
  <layout mode="table">
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
    </template>

    <card-view v-model="isLoading"
      :data="mzituList"
      :total-count="666"
      :source-keys="sourceKeys"
      @load="onMoreLoad"
      @right-top-icon-click="onGetAllPicClick">
      <template #default="{mzitu}">
        <el-tooltip class="item"
          effect="dark"
          :content="`在线预览：${mzitu.url}`"
          placement="top">
          <el-link class="content__title"
            :href="mzitu.url"
            :underline="false"
            target="_blank"><i class="el-icon-view el-icon--right"></i>
            {{ mzitu.name }}</el-link>
        </el-tooltip>
      </template>
    </card-view>
  </layout>
</template>

<script>
import {
  reFetchAlbumUrls,
  reSaveMzituAlbum,
  reFetchMzituCategoryList,
  reFetchMzitu
} from 'api/mzitu'
export default {
  name: 'mzituCardView',
  components: {
    layout: () => import('@/layout'),
    CardView: () => import('../components/CardView')
  },
  props: {},
  data() {
    return {
      currentCategory: '',
      categoryList: [],
      searchMzitu: '',
      mzituList: [],

      isLoading: false,
      page: {
        index: 1,
        total: 0
      },
      sourceKeys: {
        title: 'name'
      }
    }
  },

  methods: {
    onMoreLoad() {
      this.reFindMzitu()
    },

    onCategoryChange() {
      this.searchMzitu = ''
      this.initReData()
    },

    initReData() {
      this.page.index = 1
      this.mzituList = []
      this.reFindMzitu()
    },

    onGetAllPicClick({ url, name, date }) {
      this.isDownloading = true
      reFetchAlbumUrls(url).then(data => {
        this.$message.success('服务器正在下载中')
        this.reSaveDownload(data.srcList, name, date)
      })
    },

    reSaveDownload(urls, name, date) {
      reSaveMzituAlbum(urls, name, date)
        .then(data => {
          this.$message.success('下载成功')
        })
        .catch(() => {
          this.$message.error('下载失败咯')
        })
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
        } else {
          this.noMore = true
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
@import '@/theme/index.scss';

.card-mzitu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  &__content {
    width: 236px;
    position: relative;
    cursor: pointer;
    height: 354px;
    margin: 0 10px 20px;
    &:hover {
      .content {
        opacity: 1;
      }
    }
    .content {
      padding: 10px;
      color: #fff;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &__title {
        color: #fff;
        &:hover {
          color: #90caf9;
        }
      }
      &__date {
        text-align: right;
      }
    }
  }
  &__download {
    position: absolute;
    top: 6px;
    right: 6px;
  }
}
.el-icon-loading {
  font-size: 28px;
  color: $--color-primary;
}
</style>
