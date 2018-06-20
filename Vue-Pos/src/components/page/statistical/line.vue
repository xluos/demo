<template>
    <div id="line-chart">

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
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(
      document.getElementById("line-chart"),
      require("./macarons.js")
    );
    var data = [
      ["2000-06-05", 116],
      ["2000-06-06", 129],
      ["2000-06-07", 135],
      ["2000-06-08", 86],
      ["2000-06-09", 73],
      ["2000-06-10", 85],
      ["2000-06-11", 73],
      ["2000-06-12", 68],
      ["2000-06-13", 92],
      ["2000-06-14", 130],
      ["2000-06-15", 245],
      ["2000-06-16", 139],
      ["2000-06-17", 115],
      ["2000-06-18", 111],
      ["2000-06-19", 309],
      ["2000-06-20", 206],
      ["2000-06-21", 137],
      ["2000-06-22", 128],
      ["2000-06-23", 85],
      ["2000-06-24", 94],
      ["2000-06-25", 71],
      ["2000-06-26", 106],
      ["2000-06-27", 84],
      ["2000-06-28", 93],
      ["2000-06-29", 85],
      ["2000-06-30", 73],
      ["2000-07-01", 83],
      ["2000-07-02", 125],
      ["2000-07-03", 107],
      ["2000-07-04", 82],
      ["2000-07-05", 44],
      ["2000-07-06", 72],
      ["2000-07-07", 106],
      ["2000-07-08", 107],
      ["2000-07-09", 66],
      ["2000-07-10", 91],
      ["2000-07-11", 92],
      ["2000-07-12", 113],
      ["2000-07-13", 107],
      ["2000-07-14", 131],
      ["2000-07-15", 111],
      ["2000-07-16", 64],
      ["2000-07-17", 69],
      ["2000-07-18", 88],
      ["2000-07-19", 77],
      ["2000-07-20", 83],
      ["2000-07-21", 111],
      ["2000-07-22", 57],
      ["2000-07-23", 55],
      ["2000-07-24", 60]
    ];

    var dateList = data.map(function(item) {
      return item[0];
    });
    var valueList = data.map(function(item) {
      return item[1];
    });

    var option = {
      // Make gradient line here
      visualMap: [
        {
          show: false,
          type: "continuous",
          seriesIndex: 0,
          min: 0,
          max: 400
        },
        {
          show: false,
          type: "continuous",
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: dateList.length - 1
        }
      ],

      title: [
        {
          left: "center",
          text: "Gradient along the y axis"
        },
        {
          top: "55%",
          left: "center",
          text: "Gradient along the x axis"
        }
      ],
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          data: dateList
        },
        {
          data: dateList,
          gridIndex: 1
        }
      ],
      yAxis: [
        {
          splitLine: { show: false }
        },
        {
          splitLine: { show: false },
          gridIndex: 1
        }
      ],
      grid: [
        {
          bottom: "60%"
        },
        {
          top: "60%"
        }
      ],
      series: [
        {
          type: "line",
          showSymbol: false,
          data: valueList
        },
        {
          type: "line",
          showSymbol: false,
          data: valueList,
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    };
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
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "邮件营销1",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [820, 932, 901, 934, 1290, 1330, 320]
        }
      ]
    });
  }
};
</script>

<style scoped>
#line-chart {
  width: 100%;
  height: 100%;
}
</style>
