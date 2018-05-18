import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HI from '@/components/Hi'
import HI1 from '@/components/Hi.1'
import HI2 from '@/components/Hi.2'
import Params from '@/components/params'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/params/:newid/:newtitle',
      name: 'params',
      component: Params
    },
    {
      path: '/gohome',
      redirect: '/'
    },
    {
      path: '/hi',
      name: 'HI',
      component: HI,
      children: [
        // {path: '/', component: HI},
        {path: 'hi1', name: 'hi1', component: HI1},
        {path: 'hi2', name: 'hi2', component: HI2}
      ]
    }
  ]
})
