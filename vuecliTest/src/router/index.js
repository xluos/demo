import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HI from '@/components/Hi'
import HI1 from '@/components/Hi.1'
import HI2 from '@/components/Hi.2'
import Params from '@/components/params'
import _404 from '@/components/404'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/params',
      name: 'params',
      component: Params
    },
    {
      path: '/params/:newid/:newtitle',
      name: 'params-value',
      component: Params,
      beforeEnter: function (to, form, next) {
        console.log(to)
        console.log(form)
        next()
      }
    },
    {
      path: '/gohome',
      redirect: '/'
    },
    {
      path: '/gopage/:newid/:newtitle',
      redirect: '/params/:newid/:newtitle'
    },
    {
      path: '/hi',
      name: 'HI',
      component: HI,
      children: [
        // {path: '/', component: HI},
        { path: 'hi1', name: 'hi1', component: HI1 },
        { path: 'hi2', name: 'hi2', component: HI2 }
      ]
    },
    {
      path: '*',
      component: _404
    }
  ]
})
