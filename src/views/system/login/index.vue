<template>
  <div id="login"
    :style="bingBackground">
    <div class="auth-wrapper"
      :style="bingBackground">
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
import { REGISTERED } from '@/config.js'
import { reFetchBingPic } from '@/api/login'
export default {
  name: 'login',

  components: {
    LoginCard: () => import('./LoginCard'),
    RegisterCard: () => import('./RegisterCard')
  },

  data() {
    return {
      currentComponent: 'LoginCard',
      avatar: '',
      bing: ''
    }
  },

  computed: {
    isLogin() {
      return this.currentComponent === 'LoginCard'
    },

    logoSrc() {
      return `https://yun.yang143.cn/2019/08/06/${
        this.isLogin ? '5d49915f5f6b5' : '5d49915f65107'
      }.png`
    },

    logoText() {
      return (this.isLogin ? 'Enter' : 'Register') + ' Now!'
    },

    bingBackground() {
      return { backgroundImage: `url('${this.bing.url}')` }
    }
  },

  methods: {
    onLogoClick() {
      if (REGISTERED) {
        this.currentComponent = this.isLogin ? 'RegisterCard' : 'LoginCard'
      }
    },
    // new Date().getTime()
    setAvatar(url) {
      this.avatar = url
    }
  },

  async created() {
    this.bing = await reFetchBingPic()
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
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
    background-image: inherit;
    background-repeat: no-repeat;
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
