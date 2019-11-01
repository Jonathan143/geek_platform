import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('formatTime', (value, format) => {
  return dayjs(value).format(format ? format : 'YYYY-MM-DD')
})
