<template>
  <el-container class="platform">
    <el-aside :width="slideWidth">
      <platform-navbar></platform-navbar>
    </el-aside>
    <el-container>
      <el-header height="56px"
        style="padding: 0">
        <platform-header></platform-header>
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear"
          mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',

  components: {
    PlatformHeader: () => import('./components/PlatformHeader'),
    PlatformNavbar: () => import('./components/PlatformNavbar')
  },

  computed: {
    ...mapState('layout', ['isMenuCollapsed']),
    slideWidth() {
      return this.isMenuCollapsed ? '64px' : '200px'
    }
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
  .el-aside {
    transition: all 0.3s linear;
  }
}
</style>
