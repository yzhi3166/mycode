<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data" :model="search_data">
                <!-- 筛选 -->
                <el-form-item label="按照时间筛选:">
                    <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                    --
                    <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" icon="search" @click="handdleSearch()">筛选</el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button type="primary" size="mini" icon="view" v-if="user.identity==='manager'" @click="handdleAdd()">添加</el-button>
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
                <el-table-column label="操作" prop="operation" align="center" :span='1' v-if="user.identity==='manager'">
                    <template slot-scope="scope">
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-button type="warning" size="mini" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页功能 -->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginations.page_index" :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :formData="formData" :dialog="dialog" @update="getProfile"></Dialog>
    </div>
</template>
<script>
import Dialog from "../components/Dialog";

export default {
  name: "fundList",
  data() {
    return {
      search_data: {
        startTime: "",
        enTime: ""
      },
      filterTableData:[],
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      tableData: [],
      allTableData: [],
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  computed:{
      user(){
          return this.$store.getters.user;
      }
  },
  created() {
    this.getProfile();
  },
  components: {
    Dialog
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.allTableData = res.data;
          this.filterTableData =res.data;
          //   console.log(res.data);
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //分页属性设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      // console.log(this.tableData);
    },
    handleEdit(index, row) {
      //编辑按钮
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      //删除按钮
      this.$axios
        .delete(`/api/profiles/delete/${row._id}`)
        .then(res => {
          this.$message("删除成功");
          this.getProfile();
        })
        .catch(err => {});
    },
    handdleAdd() {
      //添加按钮
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      //设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      //获取当前页index

      let index = this.paginations.page_size * (page - 1); // 0  5
      //数据总数
      // console.log(index);

      let nums = this.paginations.page_size * page; //5 10
      // console.log(nums);

      //容器
      let tables = [];
      // console.log(this.allTableData);

      for (let i = index; i < nums; i++) {
        //   console.log(this.allTableData[i]);
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handdleSearch(){
        if(!this.search_data.startTime||!this.search_data.endTime){
            this.$message({
                type:"warning",
                message:"请选择时间区间"
            })
            this.getProfile();
            return
        }
        const sTime =this.search_data.startTime.getTime();
        // console.log(sTime);
        
        const eTime =this.search_data.endTime.getTime();

        this.allTableData=this.filterTableData.filter(item =>{
            // console.log(item);
            
            let date =new Date(item.date);
            // console.log(date);
            
            let time =date.getTime();
            // console.log(time);
            
            return time >=sTime &&time <=eTime
        })
        //分页数据
        this.setPaginations();
    }
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
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
