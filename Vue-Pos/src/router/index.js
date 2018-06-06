import Vue from 'vue'
import Router from 'vue-router'
import Pos from './pos.js'
import Store from './store.js'
import Vip from './vip.js'
import Statistical from './statistical.js'
import Setting from './setting'
import Login from '@/components/common/login'
import Test from '@/components/common/test'


Vue.use(Router)

export default new Router({
  routes: [
    Pos,
    Store,
    Vip,
    Statistical,
    Setting,
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/test',
        component: Test
    }
  ]
})
