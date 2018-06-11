import Setting from '@/components/page/Setting'
import Account from '@/components/page/setting/account'
import Order from '@/components/page/setting/order'
import axios from 'axios'


export default {
  path: '/setting',
  component: Setting,
  beforeEnter: (to, from, next) => {
    axios.get('http://127.0.0.1:3000/login/status', { withCredentials: true }).then((res) => {  
      if (!res.data.status) {
        next('/login/setting')
      } else {
        next();
      }
    }).catch((e)=>{
      console.log(e);
      
    })
  },
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
