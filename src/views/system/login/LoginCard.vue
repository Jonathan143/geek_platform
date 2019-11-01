<template>
  <el-form ref="form"
    :model="user">
    <el-form-item prop="username"
      :rules="{ required: true, message: '登录名不能为空' }">
      <el-input v-model="user.username"
        ref="username"
        type="text"
        size="large"
        placeholder="请输入用户名或邮箱"
        prefix-icon="el-icon-user"
        clearable
        @keydown.native.enter="$refs.password.focus()"></el-input>
    </el-form-item>
    <el-form-item prop="password"
      :rules="{ required: true, message: '登录密码不能为空' }">
      <el-input v-model="user.password"
        ref="password"
        size="large"
        type="password"
        prefix-icon="el-icon-key"
        placeholder="请输入登录密码"
        show-password
        clearable
        @keydown.native.enter="onLoginClick"></el-input>
    </el-form-item>
    <div v-loading="isLoggingIn"
      class="buttons-wrapper">
      <el-button v-if="false"
        class="btn-login"
        size="large"
        @click="onGuestClick">游客登录</el-button>
      <el-button class="btn-login"
        type="primary"
        size="large"
        @click="onLoginClick">用户登录</el-button>
    </div>
  </el-form>
</template>

<script>
import util from '@/libs/util'
import login from './login'
export default {
  mixins: [login],

  data() {
    return {
      isLoggingIn: false,
      user: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    onGuestClick() {
      this.isLoggingIn = true
      this.$refs.form.clearValidate()
      this.user.username = 'Welcome To Chaos World'
      this.user.password = '全てはシュタインズゲートの选択だ'
      setTimeout(() => {
        this.$router.replace({ name: 'overview' })
      }, 1000)
    },

    onLoginClick() {
      this.$refs.form
        .validate()
        .then(this.userLogin(this.user))
        .catch(() => {})
    }
  },

  created() {
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      this.$router.replace({ path: this.$route.query.redirect || '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
}
.buttons-wrapper {
  display: flex;
  .btn-login {
    flex-grow: 1;
  }
}
</style>
