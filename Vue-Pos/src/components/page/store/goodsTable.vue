<template>
  <div>
    <el-row type="flex" justify="space-between" >
      <el-col :span=16 class="title" >{{ title }}</el-col>
      <el-col :span=8>
        <el-input v-model="input" placeholder="搜索商品" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary">确定</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="table"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="商品ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="品名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="成本">
    </el-table-column>
    <el-table-column
      prop="address"
      label="售价">
    </el-table-column>
    <el-table-column
      prop="address"
      label="库存">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {

    props: [
        "title"
    ],
    data() {
        return {
        input: '',
        table: []
        }
    }
}
</script>

<style scoped>
.el-input {
  width: auto;
}
.title {
  padding-left: 10px;
  height: 50px;
  text-align: left;
  line-height: 50px;
}
</style>
