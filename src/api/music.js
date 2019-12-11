import $axios from '@/plugin/axios'

// 手机号登陆
export function loginByPhone(phone, password) {
  return $axios({
    api: 'MUSIC_API/login/cellphone',
    param: { phone, password }
  })
}

// 退出登陆
export function logout() {
  return $axios({
    api: 'MUSIC_API/logout'
  })
}

// 发送验证码
export function sendCaptcha(phone) {
  return $axios({
    api: 'MUSIC_API/captcha/sent',
    param: { phone }
  })
}

// 验证验证码
export function verifyCaptcha(phone, captcha) {
  return $axios({
    api: 'MUSIC_API/captcha/verify',
    param: { phone, captcha }
  })
}

/**
 * 注册(修改密码)
 * 说明 : 调用此接口 ,传入手机号码和验证码,密码,昵称, 可注册网易云音乐账号(同时可修改密码)
 * @param {Number} phone 手机号码
 * @param {Number} captcha 验证码
 * @param {*} password 密码
 * @param {*} nickname 昵称
 */
export function registerByPhone({ phone, captcha, password, nickname }) {
  return $axios({
    api: 'MUSIC_API/register/cellphone',
    param: { phone, captcha, password, nickname }
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量 (需登录)
export function userSubcount() {
  return $axios({
    api: 'MUSIC_API/user/subcount'
  })
}

// 检测音乐是否可用
// 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
export function checkMusic(id) {
  return $axios({
    api: 'MUSIC_API/check/music',
    param: { id }
  })
}
