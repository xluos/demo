const bar = document.getElementById('bar')
const bar2 = document.getElementById('bar2')

var barChart = echarts.init(bar);
var bar2Chart = echarts.init(bar2);
var Xdata = []
for(var i=0;i<256;i++) {
    Xdata.push(i);
}
var option = {
    color: ['#f4615c','#01cf97', '#2486ff', '#aaa'],
    title: {
        text: '直方图'
    },
    // tooltip: {},
    legend: {
        data:['红','绿','蓝'],
    },
    xAxis: {
        data: Xdata,
    },
    yAxis: {
        name: '数量',
        min: 'dataMin',
        max: 'dataMax',
        offset: -10
    },
    series: [{
        name: '红',
        type: 'bar',
        data: []
    },
    {
        name: '绿',
        type: 'bar',
        data: []
    },
    {
        name: '蓝',
        type: 'bar',
        data: []
    }]
}
// 显示标题，图例和空的坐标轴
barChart.setOption(option);
bar2Chart.setOption(option);


function updateBar(chart,data) {
    var W = data.width
       ,H = data.height
       ,N 
       ,r = []
       ,g = []
       ,b = [];
    for(var i=0;i<256;i++) {
        r[i] = g[i] = b[i] = 0;
    }
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            r[data.data[N]] ++;
            g[data.data[N+1]] ++;
            b[data.data[N+2]] ++;
        }
    }
    
    chart.setOption({
        series:[
            { data: r },
            { data: g },
            { data: b }
        ]
    })
}