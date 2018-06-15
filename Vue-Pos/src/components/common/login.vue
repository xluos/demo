<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span=8>
      <h1 class='login'><i class="el-icon-warning"></i> 登录后操作{{ $route.params.toPage }}</h1>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="帐号">
          <el-input v-model="form.accounts"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="primary" @click="onStatus">注销</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        accounts: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function() {
      var user = {
        id: this.form.accounts,
        pwd: this.form.password
      }
      axios.post('http://127.0.0.1:3000/login', user, {withCredentials:true}).then((msg) => {
        if(msg.data.status) {
          this.$message({
            message: msg.data.message,
            type: 'success'
          });
          this.$router.push('/' + this.$route.params.toPage);
        } else {
          this.$message.error(msg.data.message);
        }
      }).catch((e) => {
        console.log(e);
      })
    },
    onStatus: function() {
      axios.get('http://127.0.0.1:3000/login', {withCredentials:true})
                .then((res) => {
                    if(res.data.status) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.$router.push('/pos');
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch((error) => {
                    this.$message.error('出现错误')
                });
    }
  }
  
}
</script>

<style scoped>
.row-bg {
  padding-top: 100px;
}
.login {
  font-size: 30px;
  padding-left: 40px;
  margin: 40px 0;
}
</style>
