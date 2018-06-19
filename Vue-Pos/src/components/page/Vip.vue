<template>
    <el-row class="vip-page-content">
        <div class="operation">
            <div>
                <h4 class="operation-title">快速搜索</h4>
                <el-select class="search-select" v-model="searchType" placeholder="请选择">
                    <el-option
                    v-for="item in searchOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="search-input" v-model="searchText" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                <el-button type="primary" @click="searchBtn" plain>确定</el-button>
            </div>
            <el-button type="primary" icon="el-icon-plus" circle @click="addUser"></el-button>
        </div>
        <el-table
            class="vip-table"
            :data="vipTableData"
            border
            stripe
            height="90%"
            style="width: 100%">
            <el-table-column
            prop="_id"
            label="会员ID"
            width="210px">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="tel"
            label="手机号">
            </el-table-column>
            <el-table-column
            prop="wx"
            label="微信号">
            </el-table-column>
            <el-table-column
            prop="integral"
            label="现有积分">
            </el-table-column>
            <el-table-column
            prop="sumintegral"
            label="总积分">
            </el-table-column>
            <el-table-column
            prop="balance"
            label="用户余额">
            </el-table-column>
            <el-table-column
            prop="grade"
            label="会员级别"
            :filters="gradefilter" :filter-method="filterType" filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.grade | gradetag" disable-transitions>{{scope.row.grade | gradetext}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="150px">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleVipEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleVipDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVipVisible"
        width="40%"
        top="5vh"
        @close="formVip = []">
        <el-form ref="formvip" :model="formVip" :rules="rules" label-width="60px">
            <el-form-item label="会员ID">
                <el-input v-model="formVip._id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formVip.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formVip.tel"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
                <el-input v-model="formVip.wx"></el-input>
            </el-form-item>
            <el-form-item label="积分">
                <el-input v-model.number="formVip.integral"></el-input>
            </el-form-item>
            <el-form-item label="总积分">
                <el-input v-model.number="formVip.sumintegral"></el-input>
            </el-form-item>
            <el-form-item label="余额">
                <el-input v-model.number="formVip.balance"></el-input>
            </el-form-item>
            <el-form-item label="等级">
                <el-select v-model.number="formVip.grade" placeholder="请选择">
                    <el-option
                    v-for="item in gradeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
        </el-dialog>
    </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ismenu: true,
      formVip: {
        _id: "",
        name: "",
        tel: "",
        wc: "",
        integral: "",
        sumintegral: "",
        balance: "",
        grade: 0
      },
      searchText: "",
      searchType: "name",
      searchOptions: [
        {
          label: "ID",
          value: "id"
        },
        {
          label: "会员名",
          value: "name"
        },
        {
          label: "电话",
          value: "tel"
        },
        {
          label: "微信号",
          value: "wx"
        }
      ],
      gradeOptions: [
        {
          label: "大众会员",
          value: 0
        },
        {
          label: "黄金会员",
          value: 1
        },
        {
          label: "钻石会员",
          value: 2
        }
      ],
      gradefilter: [
        {
          text: "大众会员",
          value: 0
        },
        {
          text: "黄金会员",
          value: 1
        },
        {
          text: "钻石会员",
          value: 2
        }
      ],
      vipTableData: [],
      dialogVipVisible: false,
      index: 0,
      submitType: "post",
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, message: "必填项", trigger: "blur" }],
        wx: [{ required: true, message: "必填项", trigger: "blur" }],
        grade: [{ required: true, message: "请选择会员等级", trigger: "blur" }],
        integral: [
          { required: true, message: "请填写", trigger: "blur" },
          { type: "number", message: "输入必须为数字", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 999,
            message: "区间为0-9999",
            trigger: "blur"
          }
        ],
        sumintegral: [
          { required: true, message: "请填写", trigger: "blur" },
          { type: "number", message: "输入必须为数字", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 999,
            message: "区间为0-9999",
            trigger: "blur"
          }
        ],
        balance: [
          { required: true, message: "请填写", trigger: "blur" },
          { type: "number", message: "输入必须为数字", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 999,
            message: "区间为0-9999",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created: function() {
    this.update();
  },
  filters: {
    gradetag(val) {
      return ["", "success", "warning"][val];
    },
    gradetext(val) {
      return ["大众会员", "黄金会员", "钻石会员"][val];
    }
  },
  methods: {
    update() {
      this.loading = true;
      axios
        .get("/user")
        .then(res => {
          console.log(res);
          this.vipTableData = res.data;
        })
        .catch(e => {
          this.$message.error("获取数据出错");
          console.log(e);
        });
    },
    handleVipEdit(index, row) {
      this.formVip = row;
      this.index = index;
      this.submitType = "put";
      this.dialogVipVisible = true;
    },
    handleVipDelete(index, row) {
      axios
        .delete(`/user/${row._id}`)
        .then(msg => {
          this.$message({
            type: "success",
            message: msg.data.message
          });
          console.log(msg.data.data);
          this.vipTableData.splice(index, 1);
        })
        .catch(e => {
          console.log(e);

          this.$message.error("Error!");
        });
    },
    searchBtn: function() {
        axios
        .get(`/user/query?type=${this.searchType}&val=${this.searchText}`)
        .then(res => {
          console.log(res);
          this.vipTableData = res.data;
        })
        .catch(e => {
          this.$message.error("获取数据出错");
          console.log(e);
        });
    },
    onSubmit: function() {
      var user = this.formVip;
      this.$refs["formvip"].validate(valid => {
        if (valid) {
          if (this.submitType === "post") user._id = null;
          axios[this.submitType]("/user", user)
            .then(req => {
              console.log(req.data);

              if (req.data.status) {
                this.$message({
                  type: "success",
                  message: req.data.message
                });
                if (this.submitType === "post") {
                  this.vipTableData.push(user);
                }
                this.dialogVipVisible = false;
              } else {
                this.$message.error(req.data.message + 'aa');
              }
            })
            .catch(e => {
              console.log(e);
              this.$message.error("提交失败");
            });
        } else {
          this.$message.error("验证失败,请检查表单重新输入");
        }
      });
    },
    addUser: function() {
      this.submitType = "post";
      this.dialogVipVisible = true;
    },
    filterType(value, row) {
      return row.grade === value;
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
}
.menu-title {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #e6e6e6;
}
.menu {
  height: 100%;
  text-align: left;
  border-right: 1px solid #e6e6e6;
}
.el-form {
  width: 80%;
  margin: 0 auto;
}
.vip-page-content {
  padding: 30px;
  height: 100%;
}
.operation {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
}
.operation-title {
  display: inline-block;
  margin: 0 30px 0 10px;
  line-height: 40px;
}
.search-select {
  width: 150px;
  margin-right: 20px;
}
.search-input {
  width: 250px;
  margin-right: 20px;
}
.vip-table {
  margin-top: 20px;
}
</style>

