<template>
  <el-image v-if="isImage(name)"
    :style="style"
    fit="cover"
    lazy
    :src="name"></el-image>
  <svg v-else-if="name"
    class="geek_icon"
    :style="style"
    aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
  <i v-else
    class="geek_icon"
    :style="style"
    :class="fontClass"></i>
</template>

<script>
import { isImage } from '@/utils/validator'
import { isNumber } from 'util'
export default {
  name: 'geekIcon',

  props: {
    name: {
      type: String,
      default: ''
    },
    fontClass: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },

  computed: {
    style() {
      const size = isNumber(this.size) ? `${this.size}px` : this.size
      return Object.assign(
        {
          fontSize: size,
          color: this.color
        },
        isImage(this.name) ? { width: size, height: size } : {}
      )
    }
  },

  methods: {
    isImage
  }
}
</script>

<style lang="scss" scoped>
.geek_icon {
  flex-shrink: 0;
}
</style>
