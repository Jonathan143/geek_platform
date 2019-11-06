import $axios from '@/plugin/axios'

// 手机号登陆
export function loginByPhone(phone, password) {
  return $axios({
    api: 'login/cellphone',
    param: { phone, password }
  })
}

// 发送验证码
export function sendCaptcha(phone) {
  return $axios({
    api: 'captcha/sent',
    param: { phone }
  })
}
