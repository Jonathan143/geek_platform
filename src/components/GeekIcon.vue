<template>
  <svg v-if="name"
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
      return {
        fontSize: isNumber(this.size) ? `${this.size}px` : this.size,
        color: this.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
