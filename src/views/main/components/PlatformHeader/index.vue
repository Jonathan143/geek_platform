<template>
  <div class="header">
    <div class="header-left">
      <div class="menu-trigger"
        @click="onMenuFoldClick">
        <i :class="!isMenuCollapsed ? 'el-icon-s-fold':'el-icon-s-unfold'"></i>
      </div>
      <!-- <page-title class="page-title"></page-title> -->
    </div>
    <div class="header-right">
      <profile-info></profile-info>
    </div>
  </div>
</template>

<script>
// import PageTitle from '../PageTitle'
import ProfileInfo from './ProfileInfo'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PlatformHeader',

  components: {
    // PageTitle,
    ProfileInfo
  },

  computed: {
    ...mapState('layout', ['isMenuCollapsed']),

    headerWidth() {
      return `calc(100% - ${this.isMenuCollapsed ? '64px' : '200px'})`
    }
  },

  methods: {
    ...mapActions('layout', ['updateMenuCollapsed']),

    onMenuFoldClick() {
      this.updateMenuCollapsed(!this.isMenuCollapsed)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.header {
  display: flex;
  height: 56px;
  color: #fff;
  background: linear-gradient(
    270deg,
    $--banner-begin-background,
    $--banner-end-background
  );
  align-items: center;
  justify-content: space-between;
  // transition: all 0.3s linear;
  &-left {
    display: flex;
    .menu-trigger {
      display: flex;
      flex-shrink: 0;
      position: relative;
      font-size: 22px;
      height: 56px;
      width: 56px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-align: center;
      i {
        margin: auto;
      }
      &:hover {
        background-color: rgba($color: #fff, $alpha: 0.2);
      }
    }
    .page-title {
      margin: auto;
      padding-left: 15px;
    }
  }
  &-right {
    margin-right: 10px;
    flex-shrink: 0;
  }
}

// .header

// .header
</style>
