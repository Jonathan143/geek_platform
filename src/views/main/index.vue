<template>
  <div class="platform">
    <platform-navbar></platform-navbar>
    <platform-header></platform-header>
    <main :class="`sidebar--${isMenuCollapsed?'fold':'unfold'}`">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import PlatformHeader from './components/PlatformHeader'
import PlatformNavbar from './components/PlatformNavbar'
import { mapState } from 'vuex'
export default {
  name: 'Main',

  components: {
    PlatformHeader,
    PlatformNavbar
  },

  computed: {
    ...mapState('layout', ['isMenuCollapsed'])
  },

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.platform {
  width: 100%;
  height: 100%;
  main {
    height: 100%;
    padding: 76px 20px 20px;
    overflow-y: scroll;
    transition: padding-left 0.3s ease-in-out;
    box-sizing: border-box;
    &.sidebar {
      &--fold {
        padding-left: 84px;
      }
      &--unfold {
        padding-left: 220px;
      }
    }
  }
}
</style>
