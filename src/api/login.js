import $axios from './api'

export function reSaveLogin({ username, password }) {
  return $axios({
    method: 'post',
    api: 'user/login',
    param: {
      username,
      password
    }
  })
}

export function reSaveRegister(param) {
  return $axios({
    api: 'user/register',
    param,
    method: 'post'
  })
}

export function reFetchUserGithubInfo(username) {
  return $axios({
    api: `https://api.github.com/users/${username}`
  })
}
