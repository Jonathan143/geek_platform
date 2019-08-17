<template>
  <section class="tcb"
    :class="{'is-table': isTableMode}">
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <section class="tcb__content"
      v-if="$slots.default">
      <slot></slot>
    </section>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'none'
    }
  },
  data() {
    return {}
  },
  computed: {
    isTableMode() {
      return this.mode === 'table'
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.tcb {
  &.is-table {
    header {
      .el-input {
        width: 200px;
      }
      * {
        margin: 0 15px 10px 0;
      }
    }
    footer {
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>
