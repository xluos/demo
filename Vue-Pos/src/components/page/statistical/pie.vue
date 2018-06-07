<template>
    <div id="pie-chart">

    </div>
</template>

<script>
// 引入 ECharts 
var echarts = require('echarts');

export default {
    props: ['data'],
    data() {
        return {

        }
    },
    mounted: function () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie-chart'),require('./macarons.js'));  
        myChart.setOption({
                            title : {
                                text: '销售数量分布',
                                subtext: '纯属虚构',
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                            },
                            series : [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:335, name:'直接访问'},
                                        {value:310, name:'邮件营销'},
                                        {value:234, name:'联盟广告'},
                                        {value:135, name:'视频广告'},
                                        {value:1548, name:'搜索引擎'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        })
    }
}
</script>

<style scoped>
#pie-chart {
    width: 100%;
    height: 100%;
}
</style>
