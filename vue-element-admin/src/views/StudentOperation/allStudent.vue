<template>
  <div>
    <div>
      <!-- 下载文件 -->
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >下载 Excel 表</el-button>
      <!-- 上传文件 -->
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; fontSize:14px; "
      >
        <el-table-column type="index" label="序号" width="50px" align="center" />
        <el-table-column prop="data.name" label="姓名" align="center" />

        <el-table-column label="入学日期" sortable prop="data.date" min-width="120px" align="center">
          <template slot-scope="scope">{{ datetimes(scope.row.data.date) }}</template>
        </el-table-column>
        <el-table-column prop="data.sex" sortable label="性别" align="center" />
        <el-table-column prop="data.age" sortable label="年龄" align="center" />
        <el-table-column prop="data.system" sortable label="学制" align="center" />
        <el-table-column prop="data.major" label="学院/专业" align="center" width="150" />
        <el-table-column prop="data.class" sortable label="班级" align="center" />
        <el-table-column prop="data.market" label="市场部" align="center" width="100" />
        <el-table-column prop="data.achievement" sortable label="成绩" align="center" />
        <el-table-column prop="data.fail" sortable label="挂科次数" align="center" width="100" />
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
// 接口
import { AllStudent, addList } from '@/api/user'
export default {
  components: { UploadExcelComponent },
  data() {
    return {
      downloadLoading: false,
      tableData: [],
      //   表格
      filterVal: [
        'name',
        'date',
        'sex',
        'age',
        'system',
        'major',
        'class',
        'market',
        'achievement',
        'fail'
      ],
      //   表格头部
      headers: [
        '姓名',
        '入学日期',
        '性别',
        '年龄',
        '学制',
        '学院/专业',
        '班级',
        '市场部',
        '成绩',
        '挂科次数'
      ]
    }
  },
  created() {
    this.allStudent()
  },
  methods: {
    //   获取
    async allStudent() {
      await AllStudent().then(data => {
        this.tableData = data.date.result
      })
    },
    // 添加
    async addLists(data) {
      console.log(data)
      await addList(data).then(data => {
        console.log(data)
        this.allStudent()
        // this.tableData = data.date.result
      })
    },
    // excel下载
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        //   定义表头
        const tHeader = this.headers
        // 定义内容
        const filterVal = this.filterVal
        // 获取到数据接口的数据
        const list = this.tableData
        // 转换成excel格式数据
        const data = this.formatJson(filterVal, list)
        // console.log(data)
        // 表达下载
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    // 下载的格式转换函数
    formatJson(filterVal, jsonData) {
      // json 数据转换 为excel 表格数据
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'date') {
            return String(this.datetimes(v.data[j]))
          } else {
            return v.data[j]
          }
        })
      )
    },

    // 上传文件处理
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '请不要上传大于1m的文件',
        type: 'warning'
      })
      return false
    },
    // 上传文件
    handleSuccess({ results, header }) {
      //   console.log(results, header)
      const data = this.handformatJson(header, results)
      console.log(data)
      this.addLists({ datalist: data })
    },
    // 上传的格式转换函数
    handformatJson(filterVal, jsonData) {
      let arr = []
      jsonData.map(v => {
        let obj = {}
        filterVal.map((j, idx) => {
          if (j === this.headers[idx]) {
            obj = { ...obj, [this.filterVal[idx]]: v[j] }
          }
        })
        arr = [...arr, obj]
      })
      return arr
    },

    addZero(v) {
      return v < 10 ? '0' + v : v
    },
    datetimes(time, zhuan) {
      const dates = new Date(time)
      const year = dates.getFullYear()
      const month = dates.getMonth() + 1
      const dataI = dates.getDate()
      if (zhuan) {
        return `${year}/${this.addZero(month)}/${this.addZero(dataI)}`
      }
      return `${year}-${this.addZero(month)}-${this.addZero(dataI)}`
    }
  }
}
</script>
