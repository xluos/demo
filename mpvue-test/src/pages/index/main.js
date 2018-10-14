import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
  config: {
    usingComponents: {
      'i-card': '../../../static/dist/card/index',
      'i-tabs': '../../../static/dist/tabs/index',
      'i-tab': '../../../static/dist/tab/index'
    }
  }
}