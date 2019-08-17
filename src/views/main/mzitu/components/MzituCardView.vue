<template>
  <layout mode="table">
    <template #header>
      <el-select class="action-row__component"
        v-model="currentCategory"
        @change="onCategoryChange"
        placeholder="请选择分类">
        <el-option v-for="category in categoryList"
          :key="category.value"
          :label="category.label"
          :value="category.value">
        </el-option>
      </el-select>
      <el-input class="action-row__component"
        placeholder="搜索妹子"
        prefix-icon="el-icon-search"
        v-model="searchMzitu"
        clearable
        @keydown.enter.native="reFindMzitu">
      </el-input>
    </template>

    <div class="card-mzitu">
      <el-card class="card-mzitu__content"
        v-for="(mzitu,index) in mzituList"
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
              target="_blank"><i class="el-icon-view el-icon--right"></i> {{mzitu.name}}</el-link>
          </el-tooltip>
          <div class="content__date">{{mzitu.date}}</div>
        </div>
        <el-button class="card-mzitu__download"
          circle
          type="primary"
          icon="el-icon-upload"
          @click="onGetAllPicClick(mzitu)"></el-button>
      </el-card>
    </div>
  </layout>
</template>

<script>
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
      isLoading: false
    }
  },
  computed: {},
  methods: {
    onCategoryChange() {
      this.searchMzitu = ''
      this.reFindMzitu()
    },

    onGetAllPicClick(mzitu) {
      this.isDownloading = true
      // this.isDialogImage.title = row.name
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
          // this.isDialogImage.urlList = data
          // this.isDialogImage.visible = true
          // this.isDownloading = false
        })
        .catch(() => {
          // this.isDownloading = false
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
    reFindMzitu() {
      this.$callApi({
        api: 'mzitu',
        param: {
          type: this.currentCategory,
          content: this.searchMzitu
        },
        noNotify: true
      }).then(data => {
        this.mzituList = data
      })
    }
  },
  mounted() {
    this.reFindCategoryList()
    this.reFindMzitu()
  }
}
</script>

<style lang="scss" scoped>
.card-mzitu {
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(5, auto);
  grid-row-gap: 20px;
  justify-content: space-evenly;
  &__content {
    width: 236px;
    position: relative;
    cursor: pointer;
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

@media screen and (max-width: 1700px) {
  .card-mzitu {
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(4, auto);
  }
}

@media screen and (max-width: 1400px) {
  .card-mzitu {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(3, auto);
  }
}
@media screen and (max-width: 992px) {
  .card-mzitu {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
  }
}
@media screen and (max-width: 768px) {
  .card-mzitu {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
}
</style>
