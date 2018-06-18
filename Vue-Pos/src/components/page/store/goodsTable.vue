<template>
  <div class="tableBox" v-loading="loading">
    <el-row type="flex" justify="space-between" >
      <el-col :span=16 class="title" >{{ title }}</el-col>
      <el-col :span=8>
        <el-input v-model="input" placeholder="搜索商品" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary">确定</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="table"
    border
    style="width: 100%">
    <el-table-column
      prop="_id"
      label="商品ID"
      width="210">
    </el-table-column>
    <el-table-column
      prop="name"
      label="品名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cost"
      label="成本">
    </el-table-column>
    <el-table-column
      prop="price"
      label="售价">
    </el-table-column>
    <el-table-column
      prop="number"
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
import addForm from "@/components/page/store/addForm"
import axios from "axios"

export default {
  props: ["title", "type"],
  data() {
    return {
      input: "",
      table: [],
      loading: true
    };
  },
  watch: {
    type() {
      this.updata()
    }
  },
  mounted() {
    this.updata()
  },
  components: {
    "addform": addForm
  },
  methods: {
    updata() {
      this.loading = true;
      axios
        .get(`/goods/${this.type}`)
        .then(req => {
          this.table = req.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("获取数据出错");
          this.loading = false;
        });
    },
    handleEdit(index, row) {
      
    },
    handleDelete(index, row) {
      this.table.splice(index,1);
    }
  }
};
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
.tableBox {
  height: 100%;
  overflow-y: auto;
}
</style>
