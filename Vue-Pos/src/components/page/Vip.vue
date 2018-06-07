<template>
    <el-row>
        <el-col :span=6 class="menu">
            <div class="menu-title">商品操作</div>
            <el-form ref="form" :model="formVip" label-width="60px">
                <el-form-item label="会员ID">
                    <el-input v-model="formVip.id" :disabled="true"></el-input>
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
                    <el-input v-model="formVip.integral"></el-input>
                </el-form-item>
                <el-form-item label="总积分">
                    <el-input v-model="formVip.sumIntegral"></el-input>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="formVip.grade" placeholder="请选择">
                        <el-option
                        v-for="item in gradeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span=18 class="vip-page-content">
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
                    <el-button type="primary" plain>确定</el-button>
                </div>
                <el-button type="primary" icon="el-icon-plus" circle></el-button>
            </div>
            <el-table
                class="vip-table"
                :data="vipTableData"
                border
                stripe
                style="width: 100%">
                <el-table-column
                prop="id"
                label="会员ID">
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
                prop="sumIntegral"
                label="总积分">
                </el-table-column>
                <el-table-column
                prop="grade"
                label="会员级别">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            formVip: {
                id: '',
                name: '',
                tel: '',
                wc: '',
                integral: '',
                sumIntegral: '',
                grade: '0'
            },
            searchText: '',
            searchType: 'name',
            searchOptions: [
                {
                    label: 'ID',
                    value: 'id'
                },
                {
                    label: '会员名',
                    value: 'name'
                },
                {
                    label: '电话',
                    value: 'tel'
                },
                {
                    label: '微信号',
                    value: 'wx'
                }
            ],
            gradeOptions: [
                {
                    label: '大众会员',
                    value: '0'
                },
                {
                    label: '黄金会员',
                    value: '1'
                },
                {
                    label: '钻石会员',
                    value: '2'
                }
            ],
            vipTableData: []
        }
    },
    methods: {
        onSubmit: function () {

        }
    }
}
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
    margin: 50px auto;
}
.vip-page-content {
    padding: 10px;
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

