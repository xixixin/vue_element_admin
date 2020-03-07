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
  <el-form-item label="年龄">
    <el-input v-model="form.age"></el-input>
  </el-form-item>
  <el-form-item label="学制">
    <el-select v-model="form.system" placeholder="请选择学制">
      <el-option label="一年制" value="一年"></el-option>
      <el-option label="两年制" value="两年"></el-option>
      <el-option label="三年制" value="三年"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="专业">
    <el-select v-model="form.major" placeholder="请选择专业">
      <el-option label="web架构" value="web"></el-option>
      <el-option label="视觉设计" value="视觉"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="班级">
    <el-select v-model="form.clas" placeholder="请选择班级">
      <el-option label="1089A" value="1089A"></el-option>
      <el-option label="1807A" value="1807A"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="市场部">
    <el-select v-model="form.market" placeholder="请选择市场部">
      <el-option label="直属一" value="直属一"></el-option>
      <el-option label="直属二" value="直属二"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="已有成绩">
    <el-input v-model="form.chengji" placeholder="已有成绩"></el-input>
  </el-form-item>
  <el-form-item label="挂科次数">
    <el-input v-model="form.fail" placeholder="挂科次数"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">确定</el-button>
    <el-button>清空</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import {addstudent} from '../../../api/student'
  export default {
    data() {
      return {
        form: {
          name:'',
          sex:'',
          age:'',
          system:'',
          major:'',
          clas:'',
          market:'',
          chengji:'',
          fail:''
        }
      }
    },
    methods: {
      // 添加学生
      async onSubmit() {
        let {name,sex,age,system,major,clas,market,chengji,fail} = this.form
        let obj = {name,sex,age,system,major,clas,market,chengji,fail}
        console.log(obj);
        let {data,status} = await addstudent(obj);
        if(status === 200){
          alert(data.msg);
        }else{
          alert('失败')
        }
        this.form = ''
      },
      // 清除
    }
  }
</script>