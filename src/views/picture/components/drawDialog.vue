<template>
  <el-dialog class="draw-dialog"
    width="780px"
    :visible="visible"
    @close="$emit('input',false)">
    <div class="d-flex">
      <div class="draw-dialog__svg"
        v-if="isSVGVisible"
        v-html="data.svgHtml"></div>
      <div>
        <p class="draw-dialog__title">{{data.title}}</p>
        <vs-button flat
          success
          style="width: 260px"
          animation-type="scale"
          @click="onDownloadClick">
          <d2-icon name="download" />
          <template #animate>
            Download SVG for your projects
          </template>
        </vs-button>
      </div>
    </div>

    <el-color-picker class="draw-dialog__color-picker"
      v-model="colorPicker"
      @active-change="onActiveColorChange"
      @change="color=>{this.colorPicker = color||this.historyColor}" />
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
import { changeColor, colorRGB2Hex, downloadSvg } from '../unDraw/utils'
export default {
  components: {},
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      colorPicker: '',
      historyColor: '',
      throttle: null,
      isSVGVisible: true
    }
  },
  computed: {
    ...mapState('d2admin/color', {
      color: state => state.value
    })
  },
  watch: {
    color: {
      immediate: true,
      handler(value) {
        this.colorPicker = value
        this.historyColor = value
      }
    },
    data() {
      this.colorPicker = this.color
      this.historyColor = this.color
      this.reloadSVG()
    }
  },
  methods: {
    onActiveColorChange(color) {
      color = colorRGB2Hex(color)
      this.throttle(color)
    },

    onDownloadClick() {
      downloadSvg(
        document.querySelector('.draw-dialog__svg > .illustration-item__svg'),
        this.data.title
      )
    },

    reloadSVG() {
      this.isSVGVisible = false
      this.$nextTick(_ => {
        this.isSVGVisible = true
      })
    }
  },
  mounted() {
    this.throttle = throttle(color => {
      changeColor(
        color,
        this.colorPicker,
        document.querySelector('.draw-dialog__svg > .illustration-item__svg')
      )
      this.colorPicker = color
      this.historyColor = color
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
.draw-dialog {
  &__svg {
    margin: 0 50px;
  }
  &__title {
    font-size: 22px;
    padding: {
      top: 40px;
      bottom: 60px;
    }
  }
  &__color-picker {
    margin-left: 180px;
  }
  ::v-deep .illustration-item__svg {
    width: 330px;
    height: 230px;
  }
}
</style>
