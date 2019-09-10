let baseUrls = {
  development: 'http://localhost:3200/',
  production: 'https://api.yang143.cn/geek/'
}

module.exports = {
  APIBASEURL: baseUrls[process.env.NODE_ENV],
  REGISTERED: true
}
