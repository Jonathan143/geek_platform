<template>
  <el-menu default-active="1"
    style="height: 100%"
    class="el-menu-vertical-demo"
    :collapse="isCollapse">
    <div class="logo-wrapper">
      <div class="logo">
        <i class="el-icon-coffee-cup"></i>
        <span v-show="!isCollapse">极客平台</span>
      </div>
    </div>
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">概览</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-picture-outline-round"></i>
      <span slot="title">妹子图</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return { isCollapse: true }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  box-sizing: border-box;
  height: 50px;
  overflow-x: hidden;
  text-overflow: clip;
  white-space: nowrap;
  user-select: none;
  border: 1px solid #e5e5e5;
}
.logo {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 20px;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 5px;
  }
}
</style>
