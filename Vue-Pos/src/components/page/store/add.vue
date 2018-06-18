<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>添加商品-基本信息</span>
    </div>
    <div class="add-page-content">
          <addform :form="form"></addform>
          <div class="add-page-goods">
            <h4>预览</h4>
            <goods :goodsData=goods></goods>
          </div>
    </div>
  </el-card>
</template>

<script>
import Goods from "@/components/common/goods"
import addForm from "@/components/page/store/addForm"


export default {
  data() {
    return {
      form: {
          name: '',
          type: 'zhushi',
          cost: 0,
          price: 0,
          number: 0,
          sell: '',
          imgurl: ''
      },
      imageUrl: ''
    }
  },
  computed: {
      goods: function() {
            var form = this.form; 
            return {
                goodsImg: form.imgurl,
                goodsName: form.name,
                price: form.price
            }
      }
  },
  components: {
      "goods": Goods,
      "addform": addForm
  },
  methods: {

      handleAvatarSuccess(res, file) {
          console.log(res);
          console.log(file);
          this.form.imgurl = URL.createObjectURL(file.raw);
        
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
            axios.post('/goods', this.form).then((req)=>{
                if(req.data.status) {
                    this.$message({
                        type: 'success',
                        message: req.data.message
                    })
                    this.$refs[formName].resetFields();
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

<style>

.add-page-content {
    display: flex;
    justify-content: space-between;
}
.el-form {
    width: 460px
}
.add-page-goods {
    margin: 0 160px 0 0;
}
.avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
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
