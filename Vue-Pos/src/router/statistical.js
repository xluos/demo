import Statistical from '@/components/page/Statistical'
import axios from 'axios'

export default {
  path: '/statistical',
  name: 'Statistical',
  component: Statistical,
  beforeEnter: (to, from, next) => {
    axios.get('http://127.0.0.1:3000/login/status', { withCredentials: true }).then((res) => {  
      if (!res.data.status) {
        next('/login/statistical')
      } else {
        next();
      }
    }).catch((e)=>{
      console.log(e);
      
    })
  }
}
