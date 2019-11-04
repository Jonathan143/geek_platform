import $axios from '@/plugin/axios'

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

export async function reFetchBingPic(username) {
  const data = await $axios({
    api: 'https://cn.bing.com/HPImageArchive.aspx',
    param: {
      format: 'js',
      idx: 0,
      n: 1,
      nc: 1572861028125,
      pid: 'hp',
      video: 1
    }
  })

  const { url, enddate, startdate, copyright } = data.images
  return {
    url: `https://cn.bing.com/${url}`,
    enddate,
    startdate,
    title: copyright
  }
}
