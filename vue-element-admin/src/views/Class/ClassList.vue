<template>
  <div>
      <el-table
    :data="data"
    style="width: 100%"
    max-height="250">
    <el-table-column
      prop="name"
      label="名称">
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建时间">
    </el-table-column> 
    <el-table-column
      prop="teacher"
      label="讲师" >
    </el-table-column>
    <el-table-column
      prop="headMaster"
      label="班主任">
    </el-table-column>
    <el-table-column
      fixed="right"
      align="right"
      label="查询"
      type="button"
      @click.native.prevent="findClass">
      <template slot-scope="scope">
        <el-button
           @click="updetaClass(scope.row._id)"
          type="text"
          size="small"
          class="editorBtn">
          修改
        </el-button>
        <el-button
          @click.native.prevent="deleteClass(scope.row._id)"
          type="text"
          size="small"
          class="removeBtn">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑弹框 -->
      <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="讲师">
          <el-input v-model="form.teacher"></el-input>
        </el-form-item>
         <el-form-item label="班主任">
          <el-input v-model="form.headMaster"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="sureUptade">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
  

</template>

<script>
import  {getAllClass,deleteClass,editorClass} from '@/api/student'
  export default {
    data() {
      return {
        data: [],
         // 编辑
      dialogFormVisible: false,
      classId:'',
      form: {
          name:'',
          date:'',
          teacher:'',
          headMaster:''
        },
      }
    },
    created(){
      this.getAllClassHandle()
    },
    methods: {
          // 获取所有班级
        async getAllClassHandle(){
        let {data} = await getAllClass()
        console.log(await getAllClass())
        // this.data = [...this.data,...data.data]
        this.data = data.data
      },
      // 删除班级
      async deleteClass(id){
        let msg = confirm('确定删除么')
        if(msg == true){
          let {data} = await deleteClass(id)
          alert(data.msg)
          this.data = this.data.filter(item => {return item._id != id})
        }
      } ,
      // 编辑
    async updetaClass(id) {
      this.dialogFormVisible = true;
      this.classId = id;
      let { data } = await editorClass(id);
      // console.log(await editorStu(id))
      this.form = data.data;
    },
    // 确定编辑
    async sureUptade() { 
      let { data } = await updateStudent(this.studentId, this.form);
      this.dialogFormVisible = false;
      alert(data.msg);
      this.getAllStudentHandle();
    },
      // 查找所有班级
      findClass(){
        console.log(111)
      }
    },
  }
</script>
<style scoped>
.removeBtn,.editorBtn{
  width: 40px;
  height:28px;
  text-align: center;
  line-height: 10px;
  color:white;
  background:#409EFF;
}
.removeBtn{
  background:#F56C6C;
}
</style>