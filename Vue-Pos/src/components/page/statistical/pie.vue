<template>
    <div id="pie-chart">

    </div>
</template>

<script>
// 引入 ECharts
var echarts = require("echarts");

export default {
  props: ["data"],
  data() {
    return {};
  },
  watch: {
    data: function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("pie-chart"),
        require("./macarons.js")
      );
      var dataText = this.data.map(item => item.name);
      var seriesData = this.data.map(item => {
        return { value: item.count, name: item.name };
      });

      myChart.setOption({
        title: {
          text: "热门商品分布",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: dataText
        },
        series: [
          {
            name: "销售数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
#pie-chart {
  width: 100%;
  height: 100%;
}
</style>
