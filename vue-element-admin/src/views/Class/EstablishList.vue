<template>
  <div style="margin-top:15px;">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="班级名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="创建时间" required>
    <el-col :span="11">
      <el-form-item prop="date">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="讲师" prop="teacher">
    <el-input v-model="ruleForm.teacher"></el-input>
  </el-form-item>
  <el-form-item label="班主任" prop="headMaster">
    <el-input v-model="ruleForm.headMaster"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onaddClass">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import {addClass} from '@/api/student'
  export default {
    data() {
      return {
        ruleForm: {
          name:'',
          date:'',
          teacher:'',
          headMaster:''
        },
      };
    },
    methods: {
      async onaddClass() {
        let {name,date,teacher,headMaster} = this.ruleForm
        let obj = {name,date,teacher,headMaster}
        console.log(obj)
        let {data,status} = await addClass(obj)
        if(status === 200){
          alert(data.msg)
        }else{
          alert('失败')
        }
        this.ruleForm = ''
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        
      }
    }
  }
</script>