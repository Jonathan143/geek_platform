<template>
  <div v-loading="isDownloading"
    element-loading-text="图片下载中...">
    <div class="action-row">
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
        @keydown.enter.native="reFindTabeData">
      </el-input>
    </div>

    <el-table :data="tabeData"
      ref="mzituTable"
      stripe
      :height="tableHeight"
      :header-cell-style="{background: '#f5f7fa'}"
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%">
      <el-table-column prop="date"
        label="日期"
        sortable
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="url"
        label="标题">
        <template slot-scope="scope">
          <el-tooltip class="item"
            effect="dark"
            :content="scope.row.url"
            placement="top">
            <el-link :href="scope.row.url"
              target="_blank"><i class="el-icon-view el-icon--right"></i> {{scope.row.name}}</el-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text"
            @click="handlePre(scope.row)">预览封面</el-button>
          <el-button type="text"
            @click="onGetAllPicClick(scope.row)">获取所有图片</el-button>
        </template>
      </el-table-column>
    </el-table>

    <dialog-image :visible.sync="isDialogImage.visible"
      :title="isDialogImage.title"
      :urls="isDialogImage.urlList"
      width="60%"></dialog-image>
  </div>
</template>

<script>
import DialogImage from '@/components/DialogImage'
import { mapState } from 'vuex'
export default {
  components: { DialogImage },
  props: {},
  data() {
    return {
      currentCategory: '',
      categoryList: [],
      searchMzitu: '',
      tabeData: [],
      isDialogImage: {
        visible: false,
        title: '',
        urlList: []
      },
      isDownloading: false,
      tableHeight: 0
    }
  },
  computed: {
    ...mapState('layout', {
      bodyHeight: state => state.bodyHeight
    })
  },
  watch: {
    category() {
      this.reFindTabeData()
    }
  },
  methods: {
    handlePre(row) {
      window.open(row.coverUrl)
    },

    onGetAllPicClick(row) {
      this.isDownloading = true
      this.isDialogImage.title = row.name
      this.$callApi({
        api: 'mzitu/picurl',
        param: {
          url: row.url
        }
      }).then(data => {
        this.reSaveDownload(data.srcList.join(','), row.name)
      })
    },

    onCategoryChange() {
      this.searchMzitu = ''
      this.reFindTabeData()
    },

    reFindCategoryList() {
      this.$callApi({
        api: 'mzitu/get_category_list',
        param: {}
      }).then(data => {
        this.categoryList = data
      })
    },

    reSaveDownload(urls, name) {
      this.$callApi({
        method: 'post',
        api: 'mzitu/download',
        param: { urls, name }
      })
        .then(data => {
          this.isDialogImage.urlList = data
          this.isDialogImage.visible = true
          this.isDownloading = false
        })
        .catch(() => {
          this.isDownloading = false
        })
    },

    reFindTabeData() {
      this.$callApi({
        api: 'mzitu',
        param: {
          type: this.currentCategory,
          content: this.searchMzitu
        }
      }).then(data => {
        this.tabeData = data
      })
    },
    setMzituTableHeight() {
      this.$nextTick(() => {
        this.tableHeight =
          this.bodyHeight - this.$refs.mzituTable.$el.offsetTop - 20
      })
    }
  },
  mounted() {
    this.reFindCategoryList()
    this.reFindTabeData()
    this.setMzituTableHeight()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
</style>
