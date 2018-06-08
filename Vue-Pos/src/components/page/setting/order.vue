<template>
    <el-card class="box-card">
        <div slot="header" class="header">
            <span>订单列表</span>
            <div>
                <el-input v-model="input" placeholder="搜索商品" prefix-icon="el-icon-search"></el-input>
                <el-button type="primary">确定</el-button>
            </div>
        </div>
        <el-table
        :data="table"
        height="250"
        style="width: 100%">
        <el-table-column
        prop="id"
        label="订单号">
        </el-table-column>
        <el-table-column
        prop="date"
        label="订单日期">
        </el-table-column>
        <el-table-column
        prop="type"
        label="付款方式">
        </el-table-column>
        <el-table-column
        prop="data"
        label="订单内容">
        </el-table-column>
        <el-table-column
        prop="address"
        label="金额">
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
    </el-card>
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
.header {
    display: flex;
    justify-content: space-between;
    margin: -10px;
    line-height: 40px;
}
</style>
