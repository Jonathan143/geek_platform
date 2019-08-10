<template>
  <el-container>
    <el-aside width="64px">
      <navbar></navbar>
    </el-aside>

    <el-container>
      <el-header></el-header>
      <el-main>
        <transition name="el-fade-in-linear">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>