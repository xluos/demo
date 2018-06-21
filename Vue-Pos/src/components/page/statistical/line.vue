<template>
    <div id="line-chart">

    </div>
</template>

<script>
// 引入 ECharts
var echarts = require("echarts");

export default {
  props: ["linedata"],
  data() {
    return {};
  },
  watch: {
    linedata: function() {
      console.log(this.linedata);
      
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(
        document.getElementById("line-chart"),
        require("./macarons.js")
      );
      var keys = Object.keys(this.linedata);
      var timelist = [];
      var len = keys.length;
      for(let i = 0;i<len;i++) {
        timelist[i] = this.linedata[keys[i]];
      }
      var datezhushi = timelist.map(function(item) {
        return item.zhushi;
      });
      var datexiaoshi = timelist.map(function(item) {
        return item.xiaoshi;
      });
      var dateyinpin = timelist.map(function(item) {
        return item.yinpin;
      });
      var datetaocan = timelist.map(function(item) {
        return item.taocan;
      });


      myChart.setOption({
        title: {
          text: "销量走势"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          boundaryGap: false,
          data: keys
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "主食",
            type: "line",
            stack: "总量",
            data: datezhushi
          },
          {
            name: "小食",
            type: "line",
            stack: "总量",
            data: datexiaoshi
          },
          {
            name: "饮品",
            type: "line",
            stack: "总量",
            data: dateyinpin
          },
          {
            name: "套餐",
            type: "line",
            stack: "总量",
            data: datetaocan
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
#line-chart {
  width: 100%;
  height: 100%;
}
</style>
