import $axios from '@/plugin/axios'

// 登录
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

// 注册
export function reSaveRegister(param) {
  return $axios({
    api: 'user/register',
    param,
    method: 'post'
  })
}

// 获取Github用户信息
export function reFetchUserGithubInfo(username) {
  return $axios({
    api: `https://api.github.com/users/${username}`
  })
}

// 获取bing每日图片
export async function reFetchBingPic(username) {
  const data = await $axios({
    api: 'other/bing'
  })

  return data
}
