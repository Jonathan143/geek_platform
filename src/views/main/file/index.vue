<template>
  <div class="file">
    <el-breadcrumb class="file__breadcrumb">
      <template v-for="(item) in breadcrumbList">
        <el-breadcrumb-item :key="item.path"
          @click.native="onBreadcrumbClick(item)"><a href="javascript:void(0)">{{item.name}}</a></el-breadcrumb-item>
      </template>
    </el-breadcrumb>

    <file-view :list="fileList"
      sortable
      no-uploader
      is-admin
      no-action
      @fileClick="onFileClick"></file-view>
  </div>
</template>

<script>
export default {
  components: { FileView: () => import('@/components/FileView') },
  props: {},
  data() {
    return {
      fileList: [],
      queryPath: '/',
      breadcrumbList: [{ name: '根目录', path: '/' }]
    }
  },
  computed: {},
  methods: {
    reFindFileList() {
      this.$callApi({
        api: 'file',
        param: { path: this.queryPath }
      }).then(data => {
        this.fileList = [...data.dir, ...data.file]

        const breadcrumbList = this.breadcrumbList
        const currentIndex = breadcrumbList.findIndex(
          item => item.path === this.queryPath
        )
        breadcrumbList.splice(currentIndex + 1, breadcrumbList.length)
      })
    },

    onFileClick(file) {
      if (file.type === 'dir') {
        this.queryPath += `${file.name}/`
        this.breadcrumbList.push({
          name: file.name,
          path: this.queryPath
        })
      }
    },

    onBreadcrumbClick(item) {
      this.queryPath = item.path
    }
  },
  watch: {
    queryPath() {
      this.reFindFileList()
    }
  },
  mounted() {
    this.reFindFileList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.file {
  &__breadcrumb {
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 10px;
  }
}
</style>
