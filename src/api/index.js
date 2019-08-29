/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import { Notification } from 'element-ui'
import axios from 'axios'
import router from '../router'
// import qs from 'qs' // 根据需求导入qs模块

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

/**
 * 请求失败控制台log
 */
const printError = ({ method, api, param, config, error }) => {
  console.error(`${method.toUpperCase()} ["${api}"] 调用失败: ${error.message}`)
  console.log(JSON.stringify({ api, param, config }, null, 2))
}

/**
 * 创建axios实例
 * 设置post请求头
 */
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3200/'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.yang143.cn/geek/'
}
const instance = {
  timeout: 1000 * 12,
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

const callApi = ({
  method = 'get',
  api,
  param,
  config = {},
  noNotify = false
} = {}) => {
  if (noNotify && !config.timeout) config['timeout'] = 1000 * 120
  const $ = axios.create(Object.assign(instance, config))

  return $[method](api, method === 'post' ? param : { params: param })
    .then(({ data }) => {
      if (data.message === 'success') {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    })
    .catch(error => {
      if (error.response) {
        const { status } = error.response
        if (status === 401 || status === 403) {
          toLogin()
        }
      }
      printError({ method, api, param, config, error })
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message
      if (message.includes('Network Error')) {
        message = '服务器异常! /(ㄒoㄒ)/~~'
      }
      if (!noNotify) {
        Notification.error({
          title: '错误',
          message
        })
      }
      return Promise.reject(error)
    })
}

export default callApi
