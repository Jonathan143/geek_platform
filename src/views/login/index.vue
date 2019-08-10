<template>
  <div id="login">
    <div class="auth-wrapper">
      <el-avatar class="logo"
        :size="120"
        src="https://img-1256555015.file.myqcloud.com/2019/08/06/5d49915f5f6b5.png"
        @click.native="login"></el-avatar>
      <p class="logo__text">Enter Now!</p>
      <el-divider></el-divider>
      <login-card></login-card>
    </div>
  </div>
</template>

<script>
import LoginCard from './LoginCard'
export default {
  name: 'login',

  components: {
    LoginCard
  },

  data() {
    return {}
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
  height: 500px;
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
  margin: 10px auto;
  &__text {
    font-size: 30px;
    line-height: 36px;
    color: #fff;
  }
}
</style>
