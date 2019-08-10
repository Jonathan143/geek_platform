import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

const defaultStore = {}

defaultStore.modules = {
  user
}

export default new Vuex.Store(defaultStore)
