<template>
  <div class="login">
    <div class="login__card">

    </div>
    <div class="login__logo">
      <el-avatar :size="120"
        src="https://img-1256555015.file.myqcloud.com/2019/08/06/5d49915f5f6b5.png"
        @click.native="login"></el-avatar>
      <!-- <el-avatar :size="120"
        src="https://img-1256555015.file.myqcloud.com/2019/08/06/5d49915f65107.png"></el-avatar> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Vuetify from 'vuetify/lib'

@Component({
  components: {}
})
export default class Login extends Vue {
  valid: Boolean = true
  name: String = ''
  nameRules = [
    (v: String) => !!v || 'Name is required',
    (v: String) =>
      (v && v.length <= 10) || 'Name must be less than 10 characters'
  ]
  email: String = ''
  emailRules = [
    (v: String) => !!v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ]

  login() {
    this.$callApi({
      api: 'user/login',
      method: 'post',
      param: { username: 'ad' }
    }).then((data: any) => {
      Cookies.set('token', data.token, { expires: 3 })
    })
  }

  validate(): void {
    const el: any = this.$refs.form
    if (el.validate()) {
      // this.snackbar = true
    }
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('https://api.i-meto.com/bing?new') no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  &__card {
    width: 460px;
    height: 560px;
    box-shadow: 0px 3px 99px rgba(0, 0, 0, 0.16);
    border-radius: 12px;
    z-index: 1;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 100px;
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
  &__logo {
    position: absolute;
    top: calc(100% - 780px);
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
  }
}
</style>
