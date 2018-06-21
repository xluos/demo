<template>
    <div class="statistical-main" v-loading="statsLoading">
        <div class="title">销售统计</div>
        <div class="statistical-content">
            <div class="statistical-info">
                <my-info :data="infoData"></my-info>
            </div>
            <div class="statistical-line">
                <my-line :linedata="lineData"></my-line>
            </div>
            <el-button-group class="statistical-button-group">
                <el-button plain>今天</el-button>
                <el-button plain>昨天</el-button>
                <el-button plain>最近7天</el-button>
                <el-button plain>最近30天</el-button>
                <el-button plain>所有</el-button>
            </el-button-group>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span=11>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>销售分布</span>
                        </div>
                        <div class="content">
                            <my-pie :data="pieData"></my-pie>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span=11>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>十大热门商品</span>
                        </div>
                        <div class="content">
                            <my-top :data="topData"></my-top>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Info from "@/components/page/statistical/info"
import Line from "@/components/page/statistical/line"
import Pie from "@/components/page/statistical/pie"
import Top from "@/components/page/statistical/top"
import Axios from 'axios'

export default {
    data() {
        return {
            statsLoading: true,
            infoData: [
                {
                    label: '总流水',
                    value: '4515.5'
                },
                {
                    label: '移动支付流水',
                    value: '1254'
                },
                {
                    label: '会员余额流水',
                    value: '1421'
                },
                {
                    label: '现金流水',
                    value: '1840'
                },
                {
                    label: '净利润',
                    value: '888'
                },
                {
                    label: '新增会员数',
                    value: '45'
                },
            ],
            lineData: {

            },
            pieData: [

            ],
            topData: [

            ]
        }
    },
    components: {
        "my-info": Info,
        "my-line": Line,
        "my-pie": Pie,
        "my-top": Top
    },
    created: async function(){
        this.topData = await Axios.get("/stats/ten");
        this.lineData = await Axios.get("/stats/timelist");
        this.topData = this.pieData = this.topData.data.data;
        this.lineData = this.lineData.data.data;
        this.statsLoading = false;
            // Axios.all([
            // Axios.get("/stats/ten"),
            // Axios.get("/stats/timelist"),
            // ])
            // .then(response => {
            //     this.topData = response[0].data.data;
            //     this.pieData = response[0].data.data;
            //     this.lineData = response[1].data.data;
                
            // })
            // .catch(error => {
            //     this.$message({
            //     message: "数据获取失败，请检查网络",
            //     type: "error",
            //     duration: 3000
            //     });
            // });
    }
}
</script>

<style scoped>
.statistical-main {
    height: 100%;
    overflow-y: auto
}
.title {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 20px;
    background-color: #f9fafc;
    border-bottom: 1px solid #d6d6d6;
}
.statistical-content {
    width: 80%;
    padding-bottom: 50px;
    margin: 20px auto;
}
.statistical-info {
    margin-bottom: 20px;
}
.statistical-line {
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    height: 300px;
    margin-bottom: 20px;
    padding: 30px;
}
.statistical-button-group {
    margin-bottom: 20px;
}
.box-card .content {
    width: 100%;
    height: 300px;
}
</style>

