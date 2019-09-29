<template>
  <div>
    <el-switch v-model="isUploadCOS"
      active-text="COS"
      inactive-text="本地">
    </el-switch>
    <el-upload class="upload"
      drag
      :action="action"
      :on-error="onUploadError"
      :headers="{Authorization:user.token}"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-button type="primary"
      @click="onResetMenuClick">resetMenu</el-button>
  </div>
</template>

<script>
import { APIBASEURL } from '@/config.js'
import { reFetchMenuList, reResetMenuList } from 'api/user'
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      isUploadCOS: true
    }
  },
  computed: {
    ...mapState(['user']),

    action() {
      return `${APIBASEURL}${this.isUploadCOS ? 'cos' : 'file'}/upload`
    }
  },
  methods: {
    async onResetMenuClick() {
      await reResetMenuList()
      const data = await reFetchMenuList()
      Store.set('menu', data)
    },
    onUploadError(error) {
      this.$message.error('上传失败!')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.upload {
  margin: 20px 0;
}
</style>
