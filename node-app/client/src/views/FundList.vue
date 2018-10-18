<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                    <el-button type="primary" size="mini" icon="view" @click="handdleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" max-height="450" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" :span='1'>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" align="center" :span="1">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="收支类型" align="center" :span='1'>
                </el-table-column>
                <el-table-column prop="describe" label="收支描述" align="center" :span='1'>
                </el-table-column>
                <el-table-column prop="income" label="收入" align="center" :span='1'>
                    <template slot-scope="scope">
                        <span style="color:#00d053">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expend" label="支出" align="center" :span='1'>
                    <template slot-scope="scope">
                        <span style="color:#f56767">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cash" label="账户现金" align="center" :span='1'>
                    <template slot-scope="scope">
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" :span='1'>
                </el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :span='1'>
                    <template slot-scope="scope">
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-button type="warning" size="mini" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog :dialog="dialog" @update="getProfile"></Dialog>
    </div>
</template>
<script>
import Dialog from '../components/Dialog'

export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
      dialog:{
          show:false
      }
    };
  },
  created() {
    this.getProfile();
  },
  components:{
        Dialog
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.tableData = res.data;
          // console.log(res.data);
        })
        .catch(err => console.log(err));
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    handdleAdd(){
        this.dialog.show=true
    },
    
  }
};
</script>
<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
    float: right;
}
</style>
