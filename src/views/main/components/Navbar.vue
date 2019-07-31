<template>
  <div class="navbar">

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  activeIndex: string = '1'

  handleClick() {}
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;

  // &__logo {
  // }

  &__tabs {
    flex: 1;
  }

  // &__avator {
  // }
}
</style>
