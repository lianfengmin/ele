<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">订单列表</el-breadcrumb-item>
    </bread-crumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表区域 -->
      <el-table :data="orderList" stripe border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>

        <el-table-column prop="pay_status" label="是否付款">
          <template v-slot="props">
            <el-tag :type="+props.row.pay_status ? `success` : `danger`">{{
              +props.row.pay_status ? `已付款` : `未付款`
            }}</el-tag>
          </template></el-table-column
        >
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template v-slot="props">
            {{ props.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="props">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="addressDialogVisible = true"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="showProgress(props.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressDialogVisible"
      width="50%"
      @close="addressDialogClosed"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="addressOpation"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeAddress">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流进度对话框 -->
    <el-dialog
      title="物流进度"
      :visible.sync="progressDialogVisible"
      width="50%"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :icon="activity.icon"
          :timestamp="activity.ftime"
          :color="activity.color"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata'
export default {
  name: 'Order',
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb.vue'),
  },
  data() {
    return {
      //请求信息参数
      queryInfo: {
        pagesize: 10,
        pagenum: 1,
        query: ``,
      },
      orderList: [], //返回订单数据
      total: 0, //总订单数
      addressDialogVisible: false, //控制修改地址对话框
      //修改地址表单绑定数据
      addressForm: {
        address1: [],
        address2: ``,
      },
      //修改地址表单验证规则
      addressFormRules: {
        address1: [
          { required: true, message: '请选择省市区县', trigger: 'blur' },
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
        ],
      },
      //城市数据表
      cityData,
      //地址级联器配置
      addressOpation: { expandTrigger: 'hover' },
      //控制物流进度对话框
      progressDialogVisible: false,
      //物流进度数据
      progressInfo: [],
    }
  },
  methods: {
    async getOrderList() {
      let { data: res } = await this.$axios({
        url: `orders`,
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error(`获取订单失败`)
      }
      this.orderList = res.data.goods
      this.total = res.data.total
    },
    //每页显示多少条变化  事件
    handleSizeChange(size) {
      this.queryInfo.pagesize = size
      this.getOrderList()
    },
    //当前页码改变 触发事件
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page
      this.getOrderList()
    },
    //修改订单地址
    changeAddress() {
      this.addressDialogVisible = false
    },
    //级联选择项变化触发
    handleChange(e) {
      console.log(e)
    },
    //修改地址对话框关闭 触发
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    //控制物流进度对话框对话 事件
    async showProgress({ order_id }) {
      this.progressDialogVisible = true
      // let { data: res } = await this.$axios({
      //   url: `/kuaidi/1106975712662`,
      // })
      // if (res.meta.status !== 200) {
      //   return this.$message.error(res.meta.msg)
      // }
      this.progressInfo = [
        {
          time: '2018-05-10 09:39:00',
          ftime: '2018-05-10 09:39:00',
          context: '已签收,感谢使用顺丰,期待再次为您服务',
          location: '',
          icon: `el-icon-circle-check`,
          color:`green`,
        },
        {
          time: '2018-05-10 08:23:00',
          ftime: '2018-05-10 08:23:00',
          context:
            '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
          location: '',
        },
        {
          time: '2018-05-10 07:32:00',
          ftime: '2018-05-10 07:32:00',
          context: '快件到达 [北京海淀育新小区营业点]',
          location: '',
        },
        {
          time: '2018-05-10 02:03:00',
          ftime: '2018-05-10 02:03:00',
          context:
            '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
          location: '',
        },
        {
          time: '2018-05-09 23:05:00',
          ftime: '2018-05-09 23:05:00',
          context: '快件到达 [北京顺义集散中心]',
          location: '',
        },
        {
          time: '2018-05-09 21:21:00',
          ftime: '2018-05-09 21:21:00',
          context: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
          location: '',
        },
        {
          time: '2018-05-09 13:07:00',
          ftime: '2018-05-09 13:07:00',
          context: '顺丰速运 已收取快件',
          location: '',
        },
        {
          time: '2018-05-09 12:25:03',
          ftime: '2018-05-09 12:25:03',
          context: '卖家发货',
          location: '',
        },
        {
          time: '2018-05-09 12:22:24',
          ftime: '2018-05-09 12:22:24',
          context: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
          location: '',
        },
        {
          time: '2018-05-08 21:36:04',
          ftime: '2018-05-08 21:36:04',
          context: '商品已经下单',
          location: '',
        },
      ]
    },
  },

  created() {
    this.getOrderList()
  },
}
</script>

<style lang="less" scoped>
</style>