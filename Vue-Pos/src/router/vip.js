import Vip from '@/components/page/Vip'
import axios from 'axios'

export default {
  path: '/vip',
  name: 'Vip',
  component: Vip,
  beforeEnter: (to, from, next) => {
    axios.get('/login/status', { withCredentials: true }).then((res) => {  
      if (!res.data.status) {
        next('/login/vip')
      } else {
        next();
      }
    }).catch((e)=>{
      console.log(e);
      
    })
  }
}
