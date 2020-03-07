<template>
    <div style="margin-top:20px;width：90% margin：0 auto;">
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
 <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="学院">
    <el-input v-model="form.college"></el-input>
  </el-form-item>
  <el-form-item label="入职日期">
    <el-date-picker type="date" placeholder="选择日期" v-model="form.entryData" ></el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onMaster">确定</el-button>
    <el-button>清空</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { addHeadMaster } from "@/api/student";

export default {
  data() {
    return {
      form: {
          name:'',
          sex:'',
          college:'',
          entryData:''
      }, 
    };
  },
  methods: {
    // 添加班主任
   async onMaster() {
        let {name,sex,college,entryData} = this.form
        let obj = {name,sex,college,entryData}
        console.log(obj);
        let {data,status} = await addHeadMaster(obj);
        if(status === 200){
          alert(data.msg);
        }else{
          alert('失败')
        }
        this.form = ''
      },
  }
};
</script>
<style scoped>
</style>