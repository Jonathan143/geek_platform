<template>
  <div>
    <el-upload class="upload-demo"
      drag
      :action="action"
      with-credentials
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip"
        slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button type="primary"
      @click="onResetMenuClick">resetMenu</el-button>
  </div>
</template>

<script>
import { APIBASEURL } from '@/config.js'
import { reFetchMenuList, reResetMenuList } from 'api/user'
export default {
  components: {},
  props: {},
  data() {
    return {
      action: `${APIBASEURL}cos/upload`
    }
  },
  computed: {},
  methods: {
    async onResetMenuClick() {
      await reResetMenuList()
      const data = await reFetchMenuList()
      Store.set('menu', data)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
