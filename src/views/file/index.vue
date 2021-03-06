<template>
  <d2-container class="file"
    v-loading="isLoading">
    <el-breadcrumb class="file__breadcrumb">
      <template v-for="item in breadcrumbList">
        <el-breadcrumb-item :key="item.path"
          @click.native="onBreadcrumbClick(item)"><a href="javascript:void(0)">{{ item.name }}</a></el-breadcrumb-item>
      </template>
    </el-breadcrumb>

    <file-view :list="fileList"
      sortable
      no-uploader
      is-admin
      no-action
      :is-grid="isGrid"
      @fileClick="onFileClick"></file-view>

    <el-button class="file__chang-btn"
      icon="el-icon-menu"
      circle
      @click="isGrid = !isGrid"></el-button>
  </d2-container>
</template>

<script>
import { isImage } from '@/libs/util.validator'
import { reFetchFileList } from '@/api/file'
import { mapGetters } from 'vuex'
export default {
  name: 'fileIndex',
  components: { FileView: () => import('./FileView') },
  props: {},
  data() {
    return {
      fileList: [],
      queryPath: '/',
      breadcrumbList: [{ name: '根目录', path: '/' }],
      isGrid: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('d2admin/user', ['userInfo'])
  },
  methods: {
    reFindFileList() {
      this.isLoading = true
      reFetchFileList(this.queryPath)
        .then(data => {
          this.fileList = [...data.dir, ...data.file]

          const breadcrumbList = this.breadcrumbList
          const currentIndex = breadcrumbList.findIndex(
            item => item.path === this.queryPath
          )
          breadcrumbList.splice(currentIndex + 1, breadcrumbList.length)
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },

    onFileClick(file) {
      if (file.type === 'dir') {
        this.queryPath += `${file.name}/`
        this.breadcrumbList.push({
          name: file.name,
          path: this.queryPath
        })
      } else if (isImage(file.name) && file.url) {
        this.$msgbox({
          title: file.name,
          message: `<image style="width: 100%; height: 100%"
                    src="${file.url}"
                    fit="fit"></image>`,
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          center: true
        }).catch(() => {})
      }
    },

    onBreadcrumbClick(item) {
      this.queryPath = item.path
    }
  },
  watch: {
    queryPath(val) {
      this.reFindFileList()
      localStorage.fileView = JSON.stringify({
        path: val,
        breadcrumbList: this.breadcrumbList
      })
    }
  },
  mounted() {
    const fileView = localStorage.fileView
    if (fileView) {
      const { path, breadcrumbList } = JSON.parse(fileView)
      this.queryPath = path
      this.breadcrumbList = breadcrumbList
    } else {
      this.reFindFileList()
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  &__breadcrumb {
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 10px;
  }
  &__chang-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
}
</style>
