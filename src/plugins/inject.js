import Vue from 'vue'
import Store from 'store'
import expirePlugin from 'store/plugins/expire'
import callApi from '@/api'
import './element'
import '../components'

Store.addPlugin(expirePlugin)
window.Store = Store

Vue.prototype.$callApi = callApi
