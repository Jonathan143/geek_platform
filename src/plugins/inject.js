import Vue from 'vue'
import Store from 'store'
import expirePlugin from 'store/plugins/expire'
import callApi from '@/api/api'
import './element'
import '../components'
import moment from 'moment'

Store.addPlugin(expirePlugin)
window.Store = Store

Vue.prototype.$callApi = callApi

Vue.filter('formatTime', (value, format) => {
  return moment(value).format(format ? format : 'YYYY-MM-DD')
})
