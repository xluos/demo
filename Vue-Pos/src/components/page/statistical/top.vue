<template>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column label="排行" width="60" align="center">
      <template slot-scope="scope">
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column label="名字" width="60" align="center">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>  
    <el-table-column label="销量" align="center">
      <template slot-scope="scope">
        {{ scope.row.count }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            tableData: [
                        {
                            count: 15,
                            name: "aaa"
                        },
                        {
                            count: 15,
                            name: "aaa"
                        },
                        {
                            count: 15,
                            name: "aaa"
                        },
                        {
                            count: 15,
                            name: "aaa"
                        },
                    ]
        }
    }
}
</script>

<style scoped>

</style>
