import axios from 'axios'
import store from '@/store'
import router from '@/routes'
import { APIBASEURL } from '../config.js'
import { Loading, Notification } from 'element-ui' // 引用element-ui的加载和消息提示组件

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true
const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: APIBASEURL
})

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  Store.clearAll()
  Cookies.remove('token')
  const { name, fullPath } = router.currentRoute
  if (name === 'login') return
  router.replace({
    name: 'login',
    query: {
      redirect: fullPath
    }
  })
}

// 在全局请求和响应拦截器中添加请求状态
let loading = null

// 请求拦截器
$axios.interceptors.request.use(
  config => {
    const { token } = store.state.user
    if (token) {
      config.headers.Authorization = token // 请求头部添加token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
$axios.interceptors.response.use(
  response => {
    if (loading) loading.close()
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
    if (loading) loading.close()
    if (error.response) {
      const { status } = error.response
      if (status === 401 || status === 403) {
        toLogin()
      }
    }
    let message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response.data.error ||
      error.message

    if (message.includes('Network Error')) {
      message = '服务器异常! /(ㄒoㄒ)/~~'
    } else if (message.includes('timeout')) {
      message = '请求超时！请检查网络是否正常'
    }
    Notification.error({
      title: '错误',
      message
    })

    return Promise.reject(error)
  }
)

export default ({
  api,
  method = 'get',
  param,
  isLoading = true,
  loadingText
}) => {
  if (isLoading) {
    loading = Loading.service({ text: loadingText || '拼命加载中...' })
  }
  return $axios[method](api, method === 'post' ? param : { params: param })
}
