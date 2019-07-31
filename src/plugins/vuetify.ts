import Vue from 'vue'
import Vuetify, {
  VToolbar,
  VBtn,
  VSpacer,
  VIcon,
  VToolbarItems,
  VToolbarTitle,
  VTabs,
  VTab
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VToolbar,
    VBtn,
    VSpacer,
    VToolbarItems,
    VToolbarTitle,
    VIcon,
    VTabs,
    VTab
  },
  directives: {
    Ripple
  }
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#4c84ff',
        secondary: '#545454',
        accent: '#82B1FF',
        info: '#2196F3',
        success: '#3abf7c',
        warning: '#f57677',
        error: '#fea11e'
      }
    }
  }
})
