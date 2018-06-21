<template>
  <div class="tableBox" v-loading="loading">
    <el-row type="flex" justify="space-between" class="title">
      <el-col :span=16 class="title-text" >{{ title }}</el-col>
      <el-col :span=8>
        <el-input v-model="input" placeholder="商品名称模糊搜索" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" @click="onSearch">确定</el-button>
      </el-col>
    </el-row>
    <el-table
    :data="goodsTableData"
    border
    height="90%"
    style="width: 100%">
    <el-table-column
      prop="_id"
      label="商品ID"
      width="210">
    </el-table-column>
    <el-table-column
      prop="name"
      label="品名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      :filters="tablefilter" :filter-method="filterType" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.type | typetag" disable-transitions>{{scope.row.type | typetext}}</el-tag>
      </template>
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
      prop="sell"
      label="状态">
      <template slot-scope="scope">
        <el-tag :type="scope.row.sell | selltag" disable-transitions>{{scope.row.sell | selltext}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="number"
      label="库存">
    </el-table-column>
    <el-table-column label="操作" width="150">
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
  <el-dialog
  title="修改"
  :visible.sync="dialogVisible"
  width="50%"
  top="5vh">
  <addform :form="form" axiostype="put" @click="dialogclick"></addform>
  </el-dialog>
  </div>
</template>

<script>
import addForm from "@/components/page/store/addForm";
import axios from "axios";

export default {
  props: ["title", "type"],
  data() {
    return {
      input: "",
      goodsTableData: [],
      loading: true,
      dialogVisible: false,
      form: {},
      index: 0,
      tablefilter: [
          { text: '主食', value: 'zhushi' },
          { text: '小食', value: 'xiaoshi' },
          { text: '饮品', value: 'yinpin' },
          { text: '套餐', value: 'taocan' },
        ]
    };
  },
  watch: {
    type() {
      this.update();
    }
  },
  mounted() {
    console.log('商品初始化');
    
    this.update();
  },
  components: {
    addform: addForm
  },
  filters: {
    typetag(val) {
      switch (val) {
        case "zhushi":
          return "";
        case "xiaoshi":
          return "info";
        case "yinpin":
          return "success";
        case "taocan":
          return "danger";
          return "";
      }
    },
    typetext(val) {
      switch (val) {
        case "zhushi":
          return "主食";
        case "xiaoshi":
          return "小食";
        case "yinpin":
          return "饮品";
        case "taocan":
          return "套餐";
      }
      return val;
    },
    selltag(val) {
        return val ? "success":"danger";
    },
    selltext(val) {
        return val ? "在售":"下架";
    }
  },
  methods: {
    update() {
      this.loading = true;
      axios
        .get(`/goods/${this.type}`)
        .then(req => {
          console.log(req);
          this.goodsTableData = req.data.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.$message.error("获取数据出错");
          this.loading = false;
        });
    },
    handleEdit(index, row) {
      this.form = row;
      this.index = index;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      axios
        .delete(`/goods/${row._id}`)
        .then(msg => {
          this.$message({
            type: "success",
            message: msg.data.message
          });
          console.log(msg.data.data);
          this.table.splice(index, 1);
          //   this.update();
        })
        .catch(e => {
          console.log(e);

          this.$message.error("Error!");
        });
    },
    dialogclick(bool, form) {
      this.update();
      this.dialogVisible = bool;
    },
    onSearch() {
      var name = this.input;
      axios
        .get(`/goods/name/${name}`)
        .then(msg => {
          this.$message({
            type: "success",
            message: msg.data.message
          });
          this.table = msg.data.data;
        })
        .catch(e => {
          console.log(e);
          this.$message.error("Error!");
        });
    },
    filterType(value, row) {
        return row.type === value;
    }
  }
};
</script>

<style scoped>
.el-input {
  width: auto;
}
.title {
  height: 50px;
}
.title-text {
  padding-left: 10px;
  height: 50px;
  text-align: left;
  line-height: 50px;
}
.tableBox {
  height: 100%;
}
</style>
