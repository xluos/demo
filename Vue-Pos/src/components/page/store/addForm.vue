<template>
    <el-form :ref="formref" :model="form" :rules="rules" label-width="80px" :key="formkey">
        <el-form-item label="商品名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="type">
            <el-select  v-model="form.type" placeholder="请选择产品分类">
                <el-option label="主食" value="zhushi"></el-option>
                <el-option label="小食" value="xiaoshi"></el-option>
                <el-option label="饮品" value="yinpin"></el-option>
                <el-option label="套餐" value="taocan"></el-option>
            </el-select >
        </el-form-item>
        <el-form-item label="成本" prop="cost">
            <el-input placeholder="成本" v-model.number="form.cost">
                <template slot="append">￥</template>
            </el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price">
            <el-input placeholder="售价" v-model.number="form.price">
                <template slot="append">￥</template>
            </el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-upload
                class="avatar-uploader"
                action="/goods/img"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.imgurl" :src="form.imgurl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="状态" prop="sell">
            <el-radio-group v-model="form.sell">
                <el-radio :label='true'>在售</el-radio>
                <el-radio :label='false'>下架</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="库存" prop="number">
            <el-input-number v-model="form.number" controls-position="right" :min="0" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('formref')">确定</el-button>
            <el-button @click="resetForm('formref')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import axios from 'axios'
export default {
    props:["form", "axiostype"],
    data() {
        return {
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择分类', trigger: 'blur' },
                ],
                cost: [
                    { required: true, message: '请填写成本价', trigger: 'blur' },
                    { type: 'number', message: '输入必须为数字', trigger: 'blur' },
                    { type: 'number',min: 0, max: 999, message: '价格区间为0-999', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: '请填写售价', trigger: 'blur' },
                    { type: 'number', message: '输入必须为数字', trigger: 'blur' },
                    { type: 'number',min: 0, max: 999, message: '价格区间为0-999', trigger: 'blur' },
                ],
                sell: [
                    { required: true, message: '必须选择一项', trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        formkey() {
            return this.form.name
        }
    },
    methods: {

      handleAvatarSuccess(res, file) {
          this.form.imgurl = "/img/"+res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
          if (valid) {
            axios[this.axiostype]('/goods', this.form).then((req)=>{
                if(req.data.status) {
                    this.$message({
                        type: 'success',
                        message: req.data.message
                    })
                    this.$refs["formref"].resetFields();
                    this.form = [];
                    this.$emit('click',false);
                } else {
                    this.$message.error(req.data.message)
                }
            }).catch((e)=>{
                console.log(e);
                this.$message.error("提交失败")
            })
          } else {
            this.$message.error("验证失败,请检查表单重新输入")
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>


<style scoped>
.avatar-uploader .avatar-uploader-icon{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .avatar-uploader-icon:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 24px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>

