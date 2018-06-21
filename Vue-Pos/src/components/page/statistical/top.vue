<template>
    <el-table
    id="el-table"
    :data="data"
    border
    style="width: 100%">
    <el-table-column label="排行" width="50" align="center">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="名字" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>  
    <el-table-column label="销量" align="center">
      <template slot-scope="scope">
        {{ scope.row.count }}
        <span class="bar">
            <span 
                :class="{
                            'hot': true,
                            'hot-h': scope.$index>=0&&scope.$index<3,
                            'hot-m': scope.$index>=3&&scope.$index<6,
                            'hot-l': scope.$index>=6&&scope.$index<10,
                        }"
                :style="{width: (0.6 + (1 -((data[0].count-scope.row.count)/(data[0].count-data[9].count))) * 0.4)*100 + '%'}">
                </span>
            </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            
        }
    },
    computed: {
        
    }
}
</script>

<style>
#el-table td{
    padding: 2px;
    font-size: 12px;
}
.bar {
    display: inline-block;
    position: relative;
    left: 20px;
    width: 170px;
    height: 4px;
    background: #dcdcdc;
}
.hot {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
}
.hot-h {
    background: #ec6d51;
}
.hot-m {
    background: #f19f4f;
}
.hot-l {
    background: #7fcbf0;
}
</style>
