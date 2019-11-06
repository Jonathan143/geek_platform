import $axios from '@/plugin/axios'

// 删除
export function reDeleteUserById({ id, username }) {
  return $axios({
    api: 'user/delete_user_by_id',
    method: 'post',
    param: {
      id,
      username
    }
  })
}

// 用户列表
export function reFetchUserList({ id, namelike }) {
  return $axios({
    api: 'user/find_user_by_id',
    param: { id, namelike }
  })
}

// 用户权限列表
export function reFetchUserRoleList() {
  return $axios({
    api: 'user/fetch_user_role_list',
    param: {}
  })
}

// 更新用户
export function reUpdateUserById({ ...param }) {
  return $axios({
    api: 'user/update_user_by_id',
    method: 'post',
    param
  })
}

// 获取侧边菜单
export function reFetchMenuList() {
  return $axios({
    api: 'user/menu_list'
  })
}

// 重置侧边菜单
export function reResetMenuList() {
  return $axios({
    api: 'user/reset_menu'
  })
}
