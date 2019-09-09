<template>
  <el-form class="register"
    :model="registerFrom"
    :rules="rules"
    status-icon
    ref="registerFrom">
    <el-form-item label="用户类型">
      <el-radio-group v-model="registerFrom.userType">
        <el-radio label="QQ"></el-radio>
        <el-radio label="Github"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="username">
      <el-input v-model="registerFrom.username"
        prefix-icon="el-icon-user"
        :placeholder="`${registerFrom.userType}`"
        @change="onUsernameChange"></el-input>
    </el-form-item>
    <!-- <el-form-item prop="email">
      <el-input v-model="registerFrom.email"
        prefix-icon="el-icon-message"
        placeholder="请输入邮箱"></el-input>
    </el-form-item> -->
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
        userType: 'QQ',
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        avatar: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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

  methods: {
    onRegisterClick() {
      this.$refs.registerFrom
        .validate()
        .then(() => {
          this.reSaveRegister()
        })
        .catch(() => {})
    },

    async onUsernameChange(username) {
      let avatar = ''
      if (this.registerFrom.userType === 'QQ') {
        avatar = `https://q2.qlogo.cn/headimg_dl?dst_uin=${username}&spec=100`
        this.registerFrom.email = `${username}@qq.com`
      } else {
        try {
          await this.$callApi({
            api: `https://api.github.com/users/${username}`,
            filter: true,
            config: { withCredentials: false }
          }).then(data => {
            avatar = data.avatar_url
          })
        } catch (error) {
          console.log(error)
        }
      }
      this.registerFrom.avatar = avatar
      this.$emit('avatar', avatar)
    },

    reFindUserQQInfo(qq) {
      this.$callApi({
        api: `http://r.qzone.qq.com/fcg-bin/cgi_get_score.fcg?mask=7&uins=${qq}`,
        filter: true,
        param: {}
      }).then(data => {
        console.log(data)
      })
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
  .el-radio {
    color: #ffffff;
  }
  ::v-deep .el-form-item__label {
    color: #ffffff;
  }
}
</style>
