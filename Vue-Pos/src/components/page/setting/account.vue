<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账户信息</span>
            </div>
            <div class="content">
                还没想好这儿放啥
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <el-form ref="form" :model="formPwd" label-width="120px">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="formPwd.old"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="formPwd.new"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="formPwd.repeat"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定修改</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                </el-form>
        </el-card>
    </div>
</template>

<script>

export default {
  data() {
    return {
        formPwd: {
            old: '',
            new: '',
            repeat: ''
        }
    }
  },
  components: {
      
  },
  methods: {
      
  }
}
</script>

<style scoped>
.box-card {
    margin-bottom: 20px;
}
.el-form {
    width: 30%;
}
</style>
