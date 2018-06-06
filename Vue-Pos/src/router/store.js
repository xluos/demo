import Store from '@/components/page/Store'
import GoodsTable from '@/components/page/store/goodsTable'
import Add from '@/components/page/store/add'

export default {
  path: '/store',
  name: 'Store',
  component: Store,
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
