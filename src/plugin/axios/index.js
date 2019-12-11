import store from '@/store'
import axios from 'axios'
import { Notification } from 'element-ui'
import util from '@/libs/util'
import router from '@/router'

// 跳转至登录页
function toLogin() {
  util.cookies.remove('token')
  const { name, fullPath } = router.currentRoute
  if (name === 'login') return
  router.replace({
    name: 'login',
    query: {
      redirect: fullPath
    }
  })
}

// 记录和显示错误
function errorLog(error, message) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  util.log.capsule('api', message, 'danger')
  // 显示提示
  if (message.includes('Network Error')) {
    message = '服务器异常! /(ㄒoㄒ)/~~'
  } else if (message.includes('timeout')) {
    message = '请求超时！请检查网络是否正常'
  }
  Notification.error({
    title: '错误',
    message
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 60 * 1000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    if (!config.url.includes('http')) {
      const token = util.cookies.get('token')
      config.headers.authorization = token
    }
    return config
  },
  error => {
    // 发送失败
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { status, data } = response

    if ((status >= 200 && status < 300) || status === 304) {
      if (data.message) {
        Notification.success({
          title: 'success',
          message: data.message
        })
      }
      return Promise.resolve(data)
    }
    return Promise.reject(response)
  },
  error => {
    const { response } = error
    if (response) {
      const { status } = response
      if (status === 401 || status === 403) {
        toLogin()
      }

      let message =
        (response && response.data && response.data.message) ||
        response.data.error ||
        error.message
      errorLog(error, message)
    }

    return Promise.reject(error)
  }
)

export default ({ api, method = 'get', param, config }) => {
  if (api.startsWith('MUSIC_API/')) {
    api.replace('MUSIC_API/', process.env.NETEASE_CLOUD_MUSIC_API)
  }

  const params = {
    url: api,
    method,
    ...config
  }
  const ginseng = method === 'get' ? 'params' : 'data'
  params[ginseng] = param
  return service(params)
}
