<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>添加商品-基本信息</span>
    </div>
    <div class="conten">
      <el-row>
        <el-col :span=10>
          <el-form ref="form" :model="form">
            <el-form-item label="商品名称">
              <el-input v-model="form.name" placeholder="输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select  v-model="form.fenlei" placeholder="请选择产品分类">
                    <el-option label="主食" value="shanghai"></el-option>
                    <el-option label="小食" value="beijing"></el-option>
                    <el-option label="饮品" value="beijing"></el-option>
                    <el-option label="套餐" value="beijing"></el-option>
                </el-select >
            </el-form-item>
            <el-form-item label="成本">
                <el-input placeholder="成本" v-model="input4">
                    <template slot="append">￥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="售价">
                <el-input placeholder="售价" v-model="input4">
                    <template slot="append">￥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio v-model="form.radio" label="1">在售</el-radio>
                <el-radio v-model="form.radio" label="2">下架</el-radio>
            </el-form-item>
            <el-form-item label="库存">
                <el-input-number v-model="form.number" controls-position="right" @change="handleChange" :min="0" :max="999"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span=14>
          <goods :goodsData=form></goods>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
          name: '',
          fenlei: 'shanghai',
          number: 0
      }
    }
  }
}
</script>

<style scoped>
.header {
  text-align: left;
}
</style>
