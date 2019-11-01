<template>
  <svg class="geek-icon__svg"
    :style="style"
    aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'd2-icon-svg',
  props: {
    name: {
      type: String,
      required: true
    },
    size: String
  },
  computed: {
    icon() {
      return `${this.name.includes('d2') ? '#d2-' : '#icon-'}${this.name}`
    },
    style() {
      return {
        fontSize: this.size || '100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.geek-icon {
  flex-shrink: 0;
  &__svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
