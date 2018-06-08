<template>
    <el-row>
      <el-col class="menu" :span=4>
        <div class="title">设置</div>
        <el-menu
          default-active="1"
          :router=true>
          <el-menu-item index="1" :route="{name:'account'}">
            <i class="el-icon-location"></i>
            <span slot="title">账户设置</span>
          </el-menu-item>
          <el-menu-item index="2" :route="{name:'order'}">
            <i class="el-icon-menu"></i>
            <span slot="title">订单设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span=20 class='content'>
        <router-view/>
      </el-col>
    </el-row>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: true
    }
  },
  beforeCreate: function () {
    // setTimeout(() => {
    //   this.$router.push('login');
    // }, 1000);
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

