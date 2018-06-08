import Setting from '@/components/page/Setting'
import Account from '@/components/page/setting/account'
import Order from '@/components/page/setting/order'


export default {
  path: '/setting',
  component: Setting,
  children: [
    {
      path: '/',
      name: 'account',
      component: Account
    },
    {
      path: 'order',
      name: 'order',
      component: Order
    }
  ]
}
