import $axios from './api'

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

export function reFetchUserList(id) {
  return $axios({
    api: 'user/find_user_by_id',
    param: { id }
  })
}

export function reFetchUserRoleList() {
  return $axios({
    api: 'user/fetch_user_role_list',
    param: {}
  })
}

export function reUpdateUserById({ ...param }) {
  return $axios({
    api: 'user/update_user_by_id',
    method: 'post',
    param
  })
}

export function reFetchMenuList() {
  return $axios({
    api: 'user/menu_list'
  })
}

export function reResetMenuList() {
  return $axios({
    api: 'user/reset_menu'
  })
}
