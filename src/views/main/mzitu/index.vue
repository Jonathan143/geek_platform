<template>
  <div>
    <mzitu-card-view></mzitu-card-view>
    <!-- <mzitu-table></mzitu-table> -->
  </div>
</template>

<script>
export default {
  components: {
    MzituTable: () => import('./components/MzituTable'),
    MzituCardView: () => import('./components/MzituCardView')
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
</style>
