import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow() {
      util.log.capsule('geekPlatform', `v${process.env.VUE_APP_VERSION}`)
      console.log('Geek Platform  https://github.com/Jonathan143/geek_platform')
      console.log('请不要吝啬您的 star，谢谢 ~')
    }
  }
}
