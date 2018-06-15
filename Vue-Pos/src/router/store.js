import Store from '@/components/page/Store'
import GoodsTable from '@/components/page/store/goodsTable'
import Add from '@/components/page/store/add'
import axios from 'axios'

export default {
  path: '/store',
  component: Store,
  beforeEnter: (to, from, next) => {
    axios.get('/login/status', { withCredentials: true }).then((res) => {  
      if (!res.data.status) {
        next('/login/store')
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
      name: 'storeAll',
      component: GoodsTable,
      props: { title: "全部商品" }
    },
    {
      path: 'add',
      name: 'storeAdd',
      component: Add
    },
    {
      path: 'out',
      name: 'storeOut',
      component: GoodsTable,
      props: { title: "下架商品" }
    },
    {
      path: 'sale',
      name: 'storeSale',
      component: GoodsTable,
      props: { title: "在售商品" }
    }
  ]
}
