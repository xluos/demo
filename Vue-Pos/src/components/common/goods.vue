<template>
  <!-- <div class="goods">
    <img :src="goodsData.imgurl" class="foodImg">
    <div class="text">
        <p class="foodName">{{goodsData.name}}</p>
        <p class="foodPrice">￥{{goodsData.price}}元</p>
    </div>
  </div> -->
  <el-card :body-style="{ padding: '0px' }">
      <img :src=goodsData.imgurl class="image">
      <div style="padding: 8px;">
        <span>{{goodsData.name}}</span>
        <div class="bottom">￥{{goodsData.price}}元</div>
      </div>
  </el-card>
</template>

<script>
export default {
  props: ['goodsData'],
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
}
.image {
  width: 120px;
  height: 120px;
  display: block;
}
/* .goods {
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 70px;
  margin: 0 15px 10px 0;
  border: 1px solid #e6e6e6;
  box-shadow: 1px 1px 10px 0px rgba(26, 26, 26, .1);
}
.foodImg{
    width: 40%;
    margin: 5px;
}
.text {
  padding: 5px;
  overflow: hidden;
}
.foodName{
    font-size: 14px;
    color:brown;
    margin: 0;
}
.foodPrice{
    font-size: 16px;
    margin: 10px 0;
} */
</style>

