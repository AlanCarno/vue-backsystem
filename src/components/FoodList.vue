<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="食品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="餐馆名称">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="食品ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="餐馆ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="食品介绍">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="餐馆地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="食品评分">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          <el-form-item label="食品分类">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          <el-form-item label="月销量">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="食品名称" prop="id">
    </el-table-column>
    <el-table-column label="食品介绍" prop="name">
    </el-table-column>
    <el-table-column label="评分" prop="desc">
    </el-table-column>
    <el-table-column label="操作">
      <el-button>编辑</el-button>
      <el-button type="danger">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  padding-left: 40px;
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  name:"FoodList",
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  }
}
</script>