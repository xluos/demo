import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HI from '@/components/Hi'
import HI1 from '@/components/Hi.1'
import HI2 from '@/components/Hi.2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
