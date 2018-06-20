<template>
  <div class="pos" v-loading="loadingPos">
    <el-row>
      <el-col :span='9' class="pos-order">
        <el-tabs type="card">
          <el-tab-pane label="点餐" >
            <el-table :data="tableData" size="small" max-height="400">
              <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
              <el-table-column align="center" prop="oneprice" label="单价"></el-table-column>
              <el-table-column align="center" prop="count" label="数量" width="50"></el-table-column>
              <el-table-column align="center" prop="price" label="金额"></el-table-column>
              <el-table-column align="center" label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                  <i class="icon-btn el-icon-circle-plus-outline" @click="addOftenGoodsList(scope.row)" ></i>
                  <i class="icon-btn el-icon-remove-outline" @click="subOftenGoodsList(scope.row)" ></i>
                  <i class="icon-btn el-icon-delete" @click="removeOne(scope.row)" ></i>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="count-box">
              <el-col :span='12'>
                <p>总数：{{ totalCount }} 件</p>
              </el-col>
              <el-col :span='12'>
                <p>总计：￥{{ totalMoney }} 元</p>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" class="btn-row">
              <el-button type="warning" @click="staging">挂单</el-button>
              <el-button type="success" @click="checkout" :loading=checkoutLoading>结账</el-button>
              <el-button type="danger" @click="remove">清空</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="挂单" >
            敬请期待
          </el-tab-pane>
          <el-tab-pane label="外卖" >
            敬请期待
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='15'>
        <div class="often-goods">
          <div class="title">热门商品</div>
          <ul class="often-goods-list">
            <li v-for="(goods,index) in oftenGoods" class="often-goods-item">
              <el-button size="small" @click="addOftenGoodsList(goods)" plain>
                <span>{{ goods.name }}</span>
                <span class="o-price">￥{{ goods.price }}元</span>
              </el-button>
            </li>
          </ul>
        </div>

        <div class="goods-type">
          <el-tabs type="card">
            <el-tab-pane :label="typeText[index]" v-for="typeGoods,index in typeGoodsAll" :key="'type'+index">
              <ul class='cookList'>
                <li v-for="goods,index in typeGoods" @click="addOftenGoodsList(goods)" :key="'goods' + index">
                    <goods :goodsData=goods></goods>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
import Goods from '@/components/common/goods'
export default {
  name: 'Pos',
  data () {
    return {
      msg: 'POS',
      checkoutLoading: false,
      loadingPos: true,
      tableData: [],
      oftenGoods:[],
      typeText:["主食","小食","饮品","套餐"],
      typeGoodsAll:[]
    }
  },
  // 动态获取后台数据
  created: function () {

    Axios.all([
      Axios.get('http://jspang.com/DemoApi/oftenGoods.php'),
      Axios.get('/goods/type?type=zhushi'),
      Axios.get('/goods/type?type=xiaoshi'),
      Axios.get('/goods/type?type=yinpin'),
      Axios.get('/goods/type?type=taocan')

    ]).then(response=>{
      this.oftenGoods=response.shift().data;
      response.forEach(item => this.typeGoodsAll.push(item.data.data));
      this.loadingPos = false;
    }).catch(error=>{
      this.$message({
            message: "数据获取失败，请检查网络",
            type: "error",
            duration: 3000
          })
    });
    // Axios.get('http://jspang.com/DemoApi/oftenGoods.php').then(response=>{
    //   this.oftenGoods=response.data;
    // }).catch(error=>{
    //   this.$message({
    //         message: "数据获取失败，请检查网络",
    //         type: "error",
    //         duration: 3000
    //       })
    // });
    // Axios.get('http://jspang.com/DemoApi/typeGoods.php')
    //   .then(response=>{
    //      this.type0Goods=response.data[0];
    //      this.type1Goods=response.data[1];
    //      this.type2Goods=response.data[2];
    //      this.type3Goods=response.data[3];
    //   })
    //   .catch(error=>{
    //       this.$message({
    //         message: "数据获取失败，请检查网络",
    //         type: "error",
    //         duration: 3000
    //       })
    //   })

  },
  mounted: function () {
    let h = document.body.clientHeight;
    document.getElementsByClassName("pos-order")[0].style.height = h + 'px';

  },
  components: {
    'goods': Goods
  },
  computed: {
    // 计算总数
    totalCount: function() {
      let count = 0;
      this.tableData.forEach(element=>{
        count += element.count;
      })
      return count;
    },
    // 计算总价
    totalMoney: function() {
      let money = 0;
      this.tableData.forEach(element=>{
        money += element.price;
      })
      return money;
    },

  },
  methods: {
    // 根据传入的商品，返回索引。若不存在则返回 -1
    getGoodsIndex(_id) {
      for(let i = 0; i < this.tableData.length; i++) {
        if(_id === this.tableData[i]._id) {
          return i;
        }
      }
      return -1;
    },
    // 增加一个
    addOftenGoodsList(goods) {
      console.log(goods.name);
      
      // 查找列表中是否有这个商品
      let goodsIndex = this.getGoodsIndex(goods._id);
      console.log(goodsIndex);
      
      // 存在商品，数量++
      if(goodsIndex >= 0) {
        this.tableData[goodsIndex].count ++;
        this.tableData[goodsIndex].price += this.tableData[goodsIndex].oneprice;
      } else {
        // 否则添加这件商品
        this.tableData.push({
          _id: goods._id,
          name: goods.name,
          oneprice: goods.price,
          count: 1,
          price: goods.price
        })
      }


    },
    // 减少一个数量
    subOftenGoodsList(goods) {
      let goodsIndex = this.getGoodsIndex(goods._id);

      this.tableData[goodsIndex].count --;
      // 重新计算价钱
      this.tableData[goodsIndex].price -= this.tableData[goodsIndex].oneprice;

      // 数量为 0 时删除
      if(this.tableData[goodsIndex].count == 0) {
        this.del(goodsIndex);
      }
    },
    // 根据传入的商品，删除单个数据
    removeOne(goods) {
      let goodsIndex = this.getGoodsIndex(goods._id);
      this.del(goodsIndex);
    },
    // 根据索引删除一条数据
    del(index) {
      this.tableData.splice(index,1);
    },
    // 清空点餐列表
    remove() {
      this.tableData = [];
    },
    // 挂单功能
    staging() {
      // 暂未实现
    },
    // 结账功能（因为没有后台，所以模拟实现）
    checkout() {
      if(this.tableData.length == 0) {
        this.$message({
            message: "不能提交空数据！",
            type: "error",
            duration: 1000
          })
      } else {
        this.checkoutLoading = true;
        setTimeout(()=>{
          this.remove();
          this.checkoutLoading = false;
          this.$message({
            message: "结账成功！",
            type: "success",
            duration: 1000
          })
        }, Math.random()*1000)
      }
    }

  }
}
</script>


<style>
.pos, .el-row, .el-col, .el-tabs {
  height: 100%;
}
.pos .el-tabs__content {
  height: 90%;
  overflow-y: auto;
}
.pos .pos-order {
  border-right: 1px solid #c0ccda;
}
.pos .icon-btn {
  cursor: pointer;
  margin: 5px;
  font-size: 18px;
}
.pos .btn-row {
  margin-top: 50px;
}
.pos .often-goods {
  height: 35%;
  overflow: hidden;
}
.pos .often-goods .title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.pos .often-goods-item {
  list-style: none;
  float: left;
  margin: 10px;
}
.pos .o-price {
  color: #409EFF;
  font-size: 12px;
}
.pos .often-goods-list {
  height: 90%;
  overflow: auto;
}
.pos .goods-type {
  height: 65%;
}
.pos .cookList li{
    list-style: none;
    float:left;
    cursor: pointer;
    margin: 10px;
}
.pos .count-box {
  width: 90%;
  margin: 0 auto;
}
.pos li .el-card {
  margin: 0;
}
</style>
