export default {
  methods: {
    reLogin({ username, password }) {
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$callApi({
        method: 'post',
        api: 'user/login',
        param: {
          username,
          password
        }
      })
        .then(data => {
          Store.set(
            'user',
            data,
            new Date().getTime() + 6 * 24 * 60 * 60 * 1000
          )
          const config = { expires: 3 }
          process.env.NODE_ENV === 'production'
            ? Object.assign(config, { domain: '.yang143.cn' })
            : ''
          Cookies.set('token', data.token, config)
          const { redirect } = this.$route.query
          redirect
            ? this.$router.push(redirect)
            : this.$router.replace({ name: 'main' })

          loading.close()
        })
        .catch(() => {
          loading.close()
        })
    }
  }
}
