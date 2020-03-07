<template>
<div>
   <!-- 查询模块 -->
    <div class="searchbox-bs-002" v-show='isshow'>
      <li>根据可选项搜索</li>
      <li>
        <el-input v-model="search.name" size="mini" placeholder="姓名"></el-input>
      </li>
      <li>
        <el-select v-model="search.system" size="mini" placeholder="学制">
          <el-option size="mini" v-for="item in upstudys" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="search.major" size="mini" placeholder="专业">
          <el-option size="mini" v-for="item in upmajors" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="search.clas" size="mini" placeholder="班级">
          <el-option size="mini" v-for="item in upclasses" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="search.market" size="mini" placeholder="市场部">
          <el-option size="mini" v-for="item in upcityCenters" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li>
        <el-input v-model="search.chengji" size="mini" placeholder="成绩/门"></el-input>
      </li>
      <li>
        <el-select v-model="search.fail" size="mini" placeholder="挂科次数">
          <el-option size="mini" v-for="item in searFail" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li style="display:flex;">
        <el-button size="small" type="success" @click="searchAll">确定</el-button>
        <el-button size="small" type="info" @click="searchEmpty">清空</el-button>
      </li>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
    </div>
  <el-table
    :data="data"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
    <el-table-column
      prop="system"
      label="学制">
    </el-table-column>
    <el-table-column
      prop="major"
      label="专业">
    </el-table-column>
    <el-table-column
      prop="clas"
      label="班级">
    </el-table-column>
    <el-table-column
      prop="market"
      label="市场部">
    </el-table-column>
    <el-table-column
      prop="chengji"
      label="成绩/们">
    </el-table-column>
    <el-table-column
      prop="fail"
      label="挂科/次">
    </el-table-column>
    <el-table-column align="right">
        <template slot="header"
                  slot-scope="">
          <el-button v-if="searchShow"
                     type="primary"
                     size="small"
                     @click="goBack">返回</el-button>
          <el-button v-else
                     type="success"
                     size="small"
                     @click="searchResult">查询</el-button>
        </template>
         <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleUpdate(scope.row._id)">修改</el-button>
            <el-button type="text" size="small" @click="deleteStu(scope.row._id)">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
  <!-- 编辑弹框 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="学制">
          <el-select v-model="form.system"
                     placeholder="请选择学制">
            <el-option label="一年"
                       value="一年"></el-option>
            <el-option label="两年"
                       value="两年"></el-option>
            <el-option label="三年"
                       value="三年"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="form.major"
                     placeholder="请选择专业">
            <el-option label="web架构"
                       value="web架构"></el-option>
            <el-option label="视觉设计"
                       value="视觉设计"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="form.clas"
                     placeholder="请选择班级">
            <el-option label="1807A"
                       value="1807A"></el-option>
            <el-option label="1810A"
                       value="1810A"></el-option>
            <el-option label="1902B"
                       value="1902B"></el-option>
            <el-option label="1905A"
                       value="1905A"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市场部">
          <el-select v-model="form.market"
                     placeholder="请选择市场部">
            <el-option label="冀中市场部"
                       value="冀中市场部"></el-option>
            <el-option label="豫皖市场部"
                       value="豫皖市场部"></el-option>
            <el-option label="邢台市场部"
                       value="邢台市场部"></el-option>
            <el-option label="淮南市场部"
                       value="淮南市场部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已有成绩">
          <el-input v-model="form.chengji"></el-input>
        </el-form-item>
        <el-form-item label="挂科次数">
          <el-input v-model="form.fail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="updateData">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-button style="margin:0 0 20px 20px;"
               type="primary"
               icon="el-icon-document"
               @click="handleDownload">
      下载
    </el-button>
  </div>
</template>
<script>
import {getAllStudent,deleteStudent,editorStu,updateStudent,searchMsg} from '@/api/student';
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      data: [],
      // 编辑
      dialogFormVisible: false,
      studentId:'',
      isshow:false,
      searchShow: false, //搜索模块是否显示 不为1就是不显示
      // 表格
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
      form: {
        name: "",
        sex: "",
        age: "",
        system: "",
        major: "",
        clas: "",
        market: "",
        chengji: "",
        fail: ""
      },
      // 查询
      searchBtn:false,
      search:{
        name: "",
        sex: "",
        age: "",
        system: "",
        major: "",
        clas: "",
        market: "",
        chengji: "",
        fail: ""
      },
      upstudys: [
        //学制选项
        {
          value: "一年"
        },
        {
          value: "两年"
        },
        {
          value: "三年"
        }
      ],
      upmajors: [
        //专业选项
        {
          value: "web架构"
        },
        {
          value: "视觉设计"
        }
      ],
      upclasses: [
        {value:"1807A"},
        {value:"1902A"},
        {value:"1904A"},
        {value:"1903A"},
        {value:"1908A"},
        {value:"1911A"},
      ],
      upcityCenters: [
        {value:"直属一"},
        {value:"松原市场部"},
        {value:"嗯哼呀"}
      ],
      searFail: [
        //搜索挂科次数选项
        {
          value: "0次"
        },
        {
          value: "1次"
        },
        {
          value: "2次"
        },
        {
          value: "3次及以上"
        }
      ],
      checkeds: [], //批量删除中存放每一项_id的容器
      chekShow: false //多选框(批量删除)是否显示
    };
  },
  created(){
    this.getAllStudentHandle();
  },
  methods: {
    // 获取到所有的学生
    async getAllStudentHandle(){
      let {data} = await getAllStudent()
      // this.data = [...this.data,...data.data]
      this.data = data.data
    },
    // 删除学生
    async deleteStu(id){
      let msg = confirm('确定删除么？')
      if(msg == true){
        let {data} = await deleteStudent(id)
        alert(data.msg)
        this.data = this.data.filter(item => {return item._id != id})
      }
    }, 
    // 编辑
    async handleUpdate(id) {
      this.dialogFormVisible = true;
      this.studentId = id;
      let { data } = await editorStu(id);
      // console.log(await editorStu(id))
      this.form = data.data;
    },
    // 确定编辑
    async updateData() { 
      let { data } = await updateStudent(this.studentId, this.form);
      this.dialogFormVisible = false;
      alert(data.msg);
      this.getAllStudentHandle();
    },
    // 查询
    async searchResult() {
      this.isshow=true;
      this.searchShow = true

    },
    // 返回
    async goBack(){
      this.searchShow = false;
      this.isshow=false;
      this.getAllStudentHandle()

    },
    // 查询确定
    async searchAll(){
      const obj = {}
      for(const key in this.search){
        if(this.search[key] != ""){
          obj[key] = this.search[key]
        }
      }
      if(this.search.name != "" ||this.search.sex != "" ||this.search.age != ""||this.search.system != "" || this.search.major != "" || this.search.clas != ""||this.search.market != "" || this.search.chengji != "" || this.search.fail != ""){
        console.log(obj)
        await searchMsg(obj).then(data => {
          console.log(data)
          this.data = data.data
        })
      }else{
        alert('搜索的值不能为空')
      }
    },
    // 清空
    searchEmpty(){
      this.search.name="",
      this.search.sex="",
      this.search.age="",
      this.search.system="",
      this.search.major="",
      this.search.clas="",
      this.search.market="",
      this.search.chengji="",
      this.search.fail=""
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "姓名",
          "性别",
          "年龄",
          "学制",
          "专业",
          "班级",
          "市场部",
          "已有成绩",
          "挂科次数"
        ];
        const filterVal = [
          "name",
          "sex",
          "age",
          "system",
          "major",
          "clas",
          "market",
          "chengji",
          "fail"
        ];
        const data = this.formatJson(filterVal, this.data);
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style scoped>
.searchbox-bs-002 {
  width: 100%;
  display: flex;
  align-items: center;
}
.searchbox-bs-002 > li {
  width: 10%;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  list-style: none;
}
</style>