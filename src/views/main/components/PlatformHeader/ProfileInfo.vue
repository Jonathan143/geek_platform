<template>
  <div class="profile-info">
    <el-dropdown class="profile-info__menu"
      @command="handleCommand">
      <div class="menu__label">
        <el-avatar size="medium"
          src="https://avatars2.githubusercontent.com/u/26000743?s=460&v=4"></el-avatar>
        <span class="menu__username">{{username}}</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personal"><i class="el-icon-user"></i> 个人中心</el-dropdown-item>
        <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfileInfo',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('user', {
      username: state => state.nickname || state.username
    })
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'personal':
          console.log('personal')
          break
        case 'logout':
          Store.clearAll()
          Cookies.remove('token')
          this.$router.replace({ name: 'login' })
          break

        default:
          break
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.profile-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    .el-icon-arrow-down {
      transform: rotate(180deg);
    }
  }
  &__menu {
    flex: 1;
    .menu__label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      height: 56px;
    }
    .menu__username {
      padding: 0 12px;
    }
  }

  .el-icon-arrow-down {
    color: $--color-text-placeholder;
    transition: transform 0.3s ease-in-out;
  }
}
</style>
