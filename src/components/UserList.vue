<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column prop="usertime" label="注册日期" width="180">
    </el-table-column>
    <el-table-column prop="username" label="用户姓名" width="180">
    </el-table-column>
    <el-table-column prop="address" label="注册地址">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      tableData: [],
    }
  },
  async mounted() {
    // mock数据
    // let that=this;
    // axios.get('/mock/fadeData').then(function (response) {
    //   let result = response.data.mydata.list;
    //   that.tableData=result;
    // }).catch(function (error) {
    //   console.log(error);
    // });
    let res = await this.$store.dispatch('getuserlist');
    this.$data.tableData=res;
  }
}
</script>

<style scoped>
</style>
