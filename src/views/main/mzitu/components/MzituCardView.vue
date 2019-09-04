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

    <div class="card-mzitu"
      v-infinite-scroll="onMoreLoad"
      infinite-scroll-distance="360"
      :infinite-scroll-disabled="infiniteDisabled">
      <el-card class="card-mzitu__content"
        v-for="(mzitu, index) in mzituList"
        :key="index"
        :body-style="{ padding: '0px' }">
        <el-image :src="mzitu.coverUrl"
          fit="cover"
          width="100%"
          :alt="mzitu.name"
          lazy></el-image>
        <div class="content">
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
          <div class="content__date">{{ mzitu.date }}</div>
        </div>
        <el-button class="card-mzitu__download"
          circle
          type="primary"
          icon="el-icon-upload"
          @click="onGetAllPicClick(mzitu)"></el-button>
      </el-card>
    </div>
    <el-divider><i :class="loadIconClass"></i></el-divider>
  </layout>
</template>

<script>
import { Loading } from 'element-ui'
export default {
  components: {
    layout: () => import('@/layout')
  },
  props: {},
  data() {
    return {
      currentCategory: '',
      categoryList: [],
      searchMzitu: '',
      mzituList: [],
      isDialogImage: {
        visible: false,
        title: '',
        urlList: []
      },
      isLoading: false,
      page: {
        index: 1,
        total: 0
      },
      loadingInstance: true
    }
  },
  computed: {
    noMore() {
      return this.page.total >= 200
    },
    infiniteDisabled() {
      return this.isLoading || this.noMore
    },
    loadIconClass() {
      return this.noMore ? 'el-icon-finished' : 'el-icon-loading'
    }
  },
  methods: {
    onMoreLoad() {
      this.reFindMzitu(true)
    },

    onCategoryChange() {
      this.searchMzitu = ''
      this.initReData()
    },

    initReData() {
      this.initLoadingInstance()
      this.page.index = 0
      this.reFindMzitu()
    },

    onGetAllPicClick(mzitu) {
      this.isDownloading = true
      this.$callApi({
        api: 'mzitu/picurl',
        param: {
          url: mzitu.url
        }
      }).then(data => {
        this.$message.success('服务器正在下载中')
        this.reSaveDownload(data.srcList, mzitu.name, mzitu.date)
      })
    },

    reSaveDownload(urls, name, date) {
      this.$callApi({
        method: 'post',
        api: 'mzitu/download',
        param: { urls, name, date },
        noNotify: true
      })
        .then(data => {
          this.$message.success('下载成功')
        })
        .catch(() => {
          this.$message.error('下载失败咯')
        })
    },

    reFindCategoryList() {
      this.$callApi({
        api: 'mzitu/get_category_list',
        param: {}
      }).then(data => {
        this.categoryList = data
      })
    },

    reFindMzitu(infinite = false) {
      this.isLoading = true
      this.$callApi({
        api: 'mzitu',
        param: {
          type: this.currentCategory,
          content: this.searchMzitu,
          page: this.page.index
        },
        noNotify: true
      }).then(data => {
        this.mzituList = infinite ? [...this.mzituList, ...data] : data
        this.isLoading = false
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          this.loadingInstance.close()
        })
        if (infinite) {
          this.page.index++
          this.page.total = this.mzituList.length
        }
      })
    },

    initLoadingInstance() {
      this.loadingInstance = Loading.service({ text: '加载妹子中...' })
    }
  },

  watch: {
    searchMzitu(val, oldval) {
      if (oldval && !val) {
        this.initReData()
      }
    }
  },

  created() {
    this.initLoadingInstance()
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
