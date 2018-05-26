import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Goods from '@/components/page/Goods'
import Store from '@/components/page/Store'
import Vip from '@/components/page/Vip'
import Statistical from '@/components/page/Statistical'
import Setting from '@/components/page/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/statistical',
      name: 'Statistical',
      component: Statistical
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }

  ]
})
