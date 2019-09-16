<template>
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
</template>

<script>
import { APIBASEURL } from '@/config.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      action: `${APIBASEURL}cos/upload`
    }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
