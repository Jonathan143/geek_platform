/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import { Message } from 'element-ui'
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs' // 根据需求导入qs模块

interface CallApiConfig {
  method: string
  api: string
  param: object
  config: AxiosRequestConfig
  noNotify?: boolean
  error?: any
}

interface errorS {
  status: Number
  message: any
}
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = ({ status, message }: errorS) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      Message.error('请登录')
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      Message.error('登录过期，请重新登录')
      break
    // 404请求不存在
    case 404:
      Message.error('请求的资源不存在')
      break
    default:
      Message.error(message)
  }
}

/**
 * 请求失败控制台log
 */
const printError = ({
  method,
  api,
  param,
  config,
  error
}: CallApiConfig): void => {
  console.error(`${method.toUpperCase()} ["${api}"] 调用失败: ${error.message}`)
  console.log(JSON.stringify({ api, param, config }, null, 2))
}

/**
 * 创建axios实例
 * 设置post请求头
 */
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3200'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.yang143.cn/'
}
const instance = axios.create({
  timeout: 1000 * 12,
  baseURL,
  // withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

// dispose request parameters
const disposeParam = (method: string, param: any) => {
  switch (method) {
    case 'get':
      return { params: param }
    case 'post':
      return { data: qs.stringify(param) }
  }
  return param
}

const callApi = ({
  method = 'get',
  api,
  param = {},
  config = {},
  noNotify = false
}: CallApiConfig) => {
  const mParam = disposeParam(method, param)

  Object.assign(config, { url: api, method }, mParam)
  return instance(config)
    .then(data => {
      return Promise.resolve(data.data.data)
    })
    .catch(error => {
      if (!noNotify) {
        printError({ method, api, param, config, error })

        const message = error.response.data || error
        console.log(message)

        errorHandle(message)
      }
      return Promise.reject(error.message)
    })
}

export default callApi
