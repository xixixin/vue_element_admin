<template>
    <div id="myChart" :style="{width: '100%', height: '500px'}">
    
    </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '数字媒体学院人员分布表' },
            tooltip: {},
            xAxis: {
                data: ["学生人数","Web架构专业","UI设计专业","就业人数","教师人数","班主任数"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [400, 150, 250, 100, 50, 10]
            }]
        });
    }
  }
}
</script>