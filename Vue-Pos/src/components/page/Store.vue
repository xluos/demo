<template>
    <el-row v-loading="fullscreenLoading">
      <el-col class="menu" :span=4>
        <div class="title">商品操作</div>
        <el-menu
          default-active="1"
          :router=true>
          <el-menu-item index="1" :route="{name:'storeAll'}">
            <i class="el-icon-location"></i>
            <span slot="title">全部商品</span>
          </el-menu-item>
          <el-menu-item index="2" :route="{name:'storeAdd'}">
            <i class="el-icon-menu"></i>
            <span slot="title">添加商品</span>
          </el-menu-item>
          <el-menu-item index="3" :route="{name:'storeSale'}">
            <i class="el-icon-document"></i>
            <span slot="title">在售商品</span>
          </el-menu-item>
          <el-menu-item index="4" :route="{name:'storeOut'}">
            <i class="el-icon-setting"></i>
            <span slot="title">下架商品</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span=20 class='content'>
        <router-view/>
      </el-col>
    </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      fullscreenLoading: true
    }
  },
  beforeCreate: function () {
    axios.get('/login/status').then((res)=> {
        if(res.data.status) {
          this.fullscreenLoading = false;
        } else {
          this.$router.push('/login')
        }
    })
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
}
.el-menu {
  border: none;
}
.title {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #e6e6e6;
}
.menu {
  height: 100%;
  text-align: left;
  border-right: 1px solid #e6e6e6;
}
.content {
  padding: 10px;
}
</style>

