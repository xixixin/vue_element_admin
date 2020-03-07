<template>
    <div class="market-container">
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm" id="market-container">
        <el-form-item
            label="市场部"
            prop="market"
            :rules="[
            { required: true, message: '市场部不能为空'},
            { type: 'number', message: '市场部必须为数字值'}
            ]"
        >
        <el-input type="market" v-model.number="numberValidateForm.age" autocomplete="off" id="market-input"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
    </el-form-item>
    </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        numberValidateForm: {
          age: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
    .demo-ruleForm{
       background: #f4f4f5;
        width: 95%;
        height: auto;
        margin: 20px;
        padding: 20px;
    }
    .el-input--medium{
        width: 200px;
    }
</style>