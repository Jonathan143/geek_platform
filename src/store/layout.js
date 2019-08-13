/**
 * @param {Boolean} isMenuCollapsed 侧边菜单栏是否展开
 * @param {Boolean} isBack 用于 PageHeader
 * @param {Boolean} title
 */
const defaultState = () => {
  return {
    isMenuCollapsed: true,
    isBack: false,
    title: '',
    bodyHeight: document.body.clientHeight
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  getters: {},
  mutations: {
    updateLayout(state, layout) {
      Object.assign(state, layout)
      Store.set('layout', state)
    }
  },
  actions: {
    // 更新菜单栏折叠状态
    updateMenuCollapsed({ commit }, isCollapsed) {
      commit('updateLayout', { isMenuCollapsed: isCollapsed })
    }
  }
}
