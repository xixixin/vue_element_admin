<template>
  <div>
    <el-table :data="data"
              style="width: 150%">
      <el-table-column label="姓名"
                       prop="name"></el-table-column>
      <el-table-column label="性别"
                       prop="sex"></el-table-column>
      <el-table-column label="学院"
                       prop="college"></el-table-column>
      <el-table-column label="入职日期"
                       prop="entryData"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     style="margin-top:3px;"
                     @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllHeadMaster ,deleteMaster } from "@/api/student";
export default {
  data() {
    return {
      data: [], //所有学生数据
    };
  },
  created(){
    this.getAllHeadMasterHandle()
  },
  methods: {
    // 班主任列表
    async getAllHeadMasterHandle(){
      let {data} = await getAllHeadMaster()
      console.log(await getAllHeadMaster())
      // this.data = [...this.data,...data.data]
      this.data = data.data
    },
    // 删除班主任
    async handleDelete(id){
      let msg = confirm('确定删除么')
      if(msg == true){
        let {data} = await deleteMaster(id)
        alert(data.msg)
        this.data = this.data.filter(item => {return item._id != id})

      }
    }

  }
};
</script>