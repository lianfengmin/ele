<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">数据统计</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">数据报表</el-breadcrumb-item>
    </bread-crumb>
    <el-card>
      <div ref="main" class="echartsBox"></div>
    </el-card>
  </div>
</template>


<script>
import * as echarts from 'echarts/core'
export default {
  name: 'Report',
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb.vue'),
  },
  data() {
    return {
      echartsoPation: {
        title: {
          text: '下雨了吧',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    }
  },
  methods: {
    getReportList() {},
  },
  created() {
    this.getReportList()
  },
  async mounted() {
    // echarts的使用就跟之前一样，初始化图表，设置配置项
    var myChart = echarts.init(this.$refs.main)
    let { data: res } = await this.$axios({
      url: `reports/type/1`,
    })
    if (res.meta.status !== 200) {
      return this.$message.error('获取数据失败')
    }
    console.log(res.data)
    let opaction = Object.assign(this.echartsoPation, res.data)
    myChart.setOption(res.data)
  },
  watch: {
    echartsoPation() {},
  },
}
</script>

<style lang="less" scoped>
.echartsBox {
  width: 750px;
  height: 400px;
}
</style>