import { reFetchMenuList } from '@/api/user'
export default {
  methods: {
    resetMenu() {
      const setMenu = async () => {
        const menu = await reFetchMenuList()
        // 设置顶栏菜单
        this.$store.commit('d2admin/menu/headerSet', menu)
        // 设置侧边栏菜单
        this.$store.commit('d2admin/menu/asideSet', menu)
        // 初始化菜单搜索功能
        this.$store.commit('d2admin/search/init', menu)
      }
      setMenu()
    }
  }
}
