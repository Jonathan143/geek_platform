import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('d2admin/account', ['login']),

    userLogin({ username, password }) {
      this.login({
        username,
        password
      }).then(() => {
        // 重定向对象不存在则返回顶层路径
        this.$router.replace(this.$route.query.redirect || '/')
      })
    }
  }
}
