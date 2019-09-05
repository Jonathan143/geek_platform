<template>
  <el-form class="register"
    :model="registerFrom"
    :rules="rules"
    status-icon
    ref="registerFrom">
    <el-form-item prop="username">
      <el-input v-model="registerFrom.username"
        prefix-icon="el-icon-user"
        placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="registerFrom.email"
        prefix-icon="el-icon-message"
        placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="registerFrom.password"
        type="password"
        prefix-icon="el-icon-key"
        show-password
        placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="repeatPassword">
      <el-input v-model="registerFrom.repeatPassword"
        type="password"
        prefix-icon="el-icon-key"
        show-password
        placeholder="请确认密码"></el-input>
    </el-form-item>
    <el-button class="btn-register"
      type="primary"
      size="large"
      @click="onRegisterClick">用户注册</el-button>
  </el-form>
</template>

<script>
import login from '@/mixins/login'
export default {
  mixins: [login],

  data() {
    return {
      registerFrom: {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (this.registerFrom.checkPass !== '') {
                  this.$refs.registerFrom.validateField('repeatPassword')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        repeatPassword: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.registerFrom.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  methods: {
    onRegisterClick() {
      this.$refs.registerFrom
        .validate()
        .then(() => {
          this.reSaveRegister()
        })
        .catch(() => {})
    },

    reSaveRegister() {
      this.$callApi({
        api: 'user/register',
        param: this.registerFrom,
        method: 'post'
      }).then(data => {
        this.reLogin(this.registerFrom)
      })
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  .btn-register {
    width: 100%;
  }
}
</style>
