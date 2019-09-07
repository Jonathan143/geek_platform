<template>
  <div id="login">
    <div class="auth-wrapper">
      <el-avatar class="logo"
        :size="120"
        :src="avatar||logoSrc"
        @click.native="onLogoClick"></el-avatar>
      <p class="logo__text">{{logoText}}</p>
      <el-divider></el-divider>
      <div class="login__component">
        <component :is="currentComponent"
          @avatar="setAvatar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',

  components: {
    LoginCard: () => import('./LoginCard'),
    RegisterCard: () => import('./RegisterCard')
  },

  data() {
    return {
      currentComponent: 'LoginCard',
      avatar: ''
    }
  },

  computed: {
    isLogin() {
      return this.currentComponent === 'LoginCard'
    },

    logoSrc() {
      return `https://img-1256555015.file.myqcloud.com/2019/08/06/${
        this.isLogin ? '5d49915f5f6b5' : '5d49915f65107'
      }.png`
    },

    logoText() {
      return (this.isLogin ? 'Enter' : 'Register') + ' Now!'
    }
  },

  methods: {
    onLogoClick() {
      this.currentComponent = this.isLogin ? 'RegisterCard' : 'LoginCard'
    },

    setAvatar(url) {
      this.avatar = url
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background: url('https://api.i-meto.com/bing?new') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-wrapper {
  position: relative;
  text-align: center;
  width: 400px;
  height: 520px;
  padding: 0 40px 40px;
  box-sizing: border-box;
  border-radius: 12px;
  z-index: 1;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://api.i-meto.com/bing?new') no-repeat center;
    background-size: cover;
    background-attachment: fixed;
    filter: blur(20px);
    z-index: -1;
    border-radius: 9px;
    margin: -30px;
  }
}

.logo {
  margin: 10px auto 16px;
  cursor: pointer;
  &__text {
    user-select: none;
    font-size: 30px;
    line-height: 36px;
    color: #fff;
  }
}

.login__component {
  display: flex;
  width: 100%;
  height: calc(100% - 170px);
  align-items: center;
}

.el-divider--horizontal {
  margin: 10px 0;
}
</style>
