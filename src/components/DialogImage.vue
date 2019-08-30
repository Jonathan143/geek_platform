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
      default: () => [
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c01.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c02.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c03.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c04.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c05.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c06.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c07.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c08.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c09.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c10.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c11.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c12.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c13.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c14.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c15.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c16.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c17.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c18.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c19.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c20.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c21.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c22.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c23.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c24.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c25.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c26.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c27.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c28.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c29.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c30.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c31.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c32.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c33.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c34.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c35.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c36.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c37.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c38.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c39.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c40.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c41.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c42.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c43.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c44.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c45.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c46.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c47.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c48.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c49.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c50.jpg',
        'http://localhost:3200/mzitu/极品美人小沫琳胸大臀圆前凸后翘，性感美腿超诱人/30c51.jpg'
      ]
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
