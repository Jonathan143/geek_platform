import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow() {
      util.log.capsule('geekAdmin', `v${process.env.VUE_APP_VERSION}`)
      console.log(
        'Geek Admin  https://github.com/Jonathan143/d2-admin-start-kit'
      )
      console.log('请不要吝啬您的 star，谢谢 ~')
    }
  }
}
