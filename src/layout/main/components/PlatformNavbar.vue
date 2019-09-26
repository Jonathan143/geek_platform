<template>
  <el-menu ref="menu"
    class="menu"
    unique-opened
    text-color="#606266"
    :default-active="activeIndex"
    :collapse="isCollapsed">
    <div class="logo-wrapper"
      @click="onMenuFoldClick">
      <i class="el-icon-s-platform"></i>
      <span v-show="!isCollapsed">极客管理平台</span>
    </div>
    <template v-for="item of menuList">
      <el-submenu v-if="item.children && item.children.length"
        :key="item.id"
        :index="item.id">
        <template slot="title">
          <geek-icon :name="item.icon"
            :font-class="item.fontClass"></geek-icon>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="el of item.children"
          :key="el.id"
          :index="el.route.name"
          @click="onMenuItemClick(el,item)">
          <geek-icon :name="item.icon"
            :font-class="item.fontClass"></geek-icon>
          <span slot="title">{{el.title}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else
        :key="item.id"
        :index="item.route.name"
        @click="onMenuItemClick(item)">
        <geek-icon :name="item.icon"
          :font-class="item.fontClass"></geek-icon>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { reFetchMenuList } from 'api/user'
export default {
  name: 'PlatformNavbar',

  computed: {
    ...mapState({ isCollapsed: state => state.layout.isMenuCollapsed })
  },

  data() {
    return {
      activeIndex: '',
      menuList: []
    }
  },

  methods: {
    ...mapActions('layout', ['updateMenuCollapsed']),

    onMenuFoldClick() {
      this.updateMenuCollapsed(!this.isCollapsed)
    },

    reFindMenuList() {
      reFetchMenuList().then(data => {
        this.menuList = data
        Store.set('menu', data)
        this.updateActiveIndex(this.$route.name)
      })
    },

    onMenuItemClick(item, parent) {
      if (this.$route.name !== item.route.name) {
        this.$router.push(item.route)
      }
    },

    updateActiveIndex(name) {
      this.activeIndex = name
      this.$nextTick(() => {
        if (!this.$refs.menu.activeIndex) {
          const menu = this.menuList.find(
            item => !name.indexOf(item.route.name)
          )
          if (menu) this.activeIndex = menu.route.name
        }
      })
    }
  },

  mounted() {
    this.reFindMenuList()
  },

  watch: {
    '$route.name'(name) {
      this.updateActiveIndex(name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.logo-wrapper {
  box-sizing: border-box;
  height: 56px;
  overflow-x: hidden;
  text-overflow: clip;
  white-space: nowrap;
  user-select: none;
  border-bottom: 1px solid $--color-border-1;
  cursor: pointer;
  color: $--color-text-medium;
  &:hover {
    color: $--color-primary;
  }
  display: flex;
  align-items: center;
  padding: 0 20px;
  .el-icon-s-platform {
    font-size: 24px;
  }
  span {
    margin-left: 5px;
  }
}

.menu {
  height: 100%;
  box-sizing: border-box;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
  &::after {
    height: 56px;
    width: 100%;
  }

  @mixin active-right-line {
    &::before {
      content: '';
      position: absolute;
      right: -1px;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: $--color-primary;
    }
  }

  .is-active {
    &.el-menu-item {
      @include active-right-line;
    }

    &.el-submenu {
      position: relative;
      ::v-deep .el-submenu__title {
        @include active-right-line;
        * {
          color: $--color-primary;
        }
      }
    }
  }
}

.geek_icon {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>
