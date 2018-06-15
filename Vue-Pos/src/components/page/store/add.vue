<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>添加商品-基本信息</span>
    </div>
    <div class="add-page-content">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.name" placeholder="输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select  v-model="form.type" placeholder="请选择产品分类">
                    <el-option label="主食" value="zhushi"></el-option>
                    <el-option label="小食" value="xiaoshi"></el-option>
                    <el-option label="饮品" value="yinpin"></el-option>
                    <el-option label="套餐" value="taocan"></el-option>
                </el-select >
            </el-form-item>
            <el-form-item label="成本">
                <el-input placeholder="成本" v-model="form.cost">
                    <template slot="append">￥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="售价">
                <el-input placeholder="售价" v-model="form.price">
                    <template slot="append">￥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:3000/user"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio v-model="form.sell" label="1">在售</el-radio>
                <el-radio v-model="form.sell" label="0">下架</el-radio>
            </el-form-item>
            <el-form-item label="库存">
                <el-input-number v-model="form.number" controls-position="right" :min="0" :max="999"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <div class="add-page-goods">
            <h4>预览</h4>
            <goods :goodsData=form></goods>
          </div>
    </div>
  </el-card>
</template>

<script>
import Goods from "@/components/common/goods"

export default {
  data() {
    return {
      form: {
          name: '',
          type: 'zhushi',
          cost: 0,
          price: 0,
          number: 0,
          sell: true
      },
      imageUrl: ''
    }
  },
  components: {
      "goods": Goods
  },
  methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload: function() {

      },
      onSubmit: function() {

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
