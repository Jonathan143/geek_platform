<template>
  <div>
    <el-table :data="tabeData"
      stripe
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tabeData: []
    }
  },
  computed: {},
  methods: {
    handlePre(row) {
      window.open(row.coverUrl)
    },

    onGetAllPicClick(row) {
      this.$callApi({
        api: 'mzitu/picurl',
        param: {
          url: row.url
        }
      }).then(data => {
        this.reSaveDownload(data.srcList.join(','), row.name)
      })
    },

    reSaveDownload(urls, name) {
      this.$callApi({
        method: 'post',
        api: 'mzitu/download',
        param: { urls, name }
      }).then(data => {
        console.log(data)
      })
    },

    reTabeData() {
      this.$callApi({
        api: 'mzitu',
        param: {}
      }).then(data => {
        this.tabeData = data
      })
    }
  },
  mounted() {
    this.reTabeData()
  }
}
</script>

<style lang="scss" scoped>
</style>
