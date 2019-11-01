<template>
  <d2-container>
    <template #header>
      <el-button @click="a">测试下载
        <d2-icon name="cloud-download" />
      </el-button>
    </template>

    <el-progress type="circle"
      :percentage="downloadTotalPercentage"
      :format="format"></el-progress>
  </d2-container>
</template>

<script>
import batchDownload from '@/mixins/batchDownload'
export default {
  name: 'index',
  components: {},
  props: {},
  mixins: [batchDownload],
  data() {
    return {}
  },
  computed: {},
  methods: {
    format(percentage) {
      return percentage === 100 ? '下载完成' : `${percentage}%`
    },
    a() {
      this.handleBatchDownload({
        fileList: [
          'http://static.weixiaotong.com.cn//9e254d744235186970ca15b45b54b35f.dmg',
          'http://static.weixiaotong.com.cn//02dd6b3a8f37dd43a41922fb563c49a8.jpeg',
          'http://static.weixiaotong.com.cn/95d1ba958356dd71c8090ea3b8214db6b4e2b7cc.zip'
        ],
        zipName: 'PingFang'
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
