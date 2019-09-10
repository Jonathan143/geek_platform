<template>
  <el-dialog v-bind="$attrs"
    class="dialog-image"
    :visible="visible"
    @close="onDialogClose">
    <template v-for="(url, index) in urls">
      <el-image :key="index"
        :src="url"
        lazy
        :preview-src-list="imageList(index)"></el-image>
    </template>
  </el-dialog>
</template>

<script>
import { deepCopy } from '@/utils/assist'
export default {
  name: 'DialogImage',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    urls: {
      type: Array || Object,
      // required: true,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onDialogClose() {
      this.$emit('update:visible', false)
    },

    imageList(index) {
      let urlList = deepCopy(this.urls)
      const a = urlList.splice(0, index)
      return [...urlList, ...a]
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.dialog-image {
  .el-image {
    width: 48%;
    margin-bottom: 10px;
  }

  ::v-deep .el-dialog {
    margin-top: 10vh !important;
    .el-dialog__body {
      max-height: 70vh;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
