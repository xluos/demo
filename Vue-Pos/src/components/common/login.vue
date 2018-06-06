<template>
  <el-row type="flex" class="row-bg" justify="center" v-loading.lock="fullscreenLoading">
    <el-col :span=8>
      <icon class='login el-icon-warning'>登录后操作</icon>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="帐号">
          <el-input v-model="form.accounts"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      form: {
        accounts: '',
        password: ''
      }
    }
  },
  created(){
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 1000);
  }
}
</script>

<style>
.row-bg {
  padding-top: 100px;
}
.login {
  font-size: 30px;
  padding-left: 40px;
  margin: 40px 0;
}
</style>
