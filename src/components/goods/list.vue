<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">商品列表</el-breadcrumb-item>
    </bread-crumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="95px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="70px"
        ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template v-slot="scoped">
            {{ scoped.row.add_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template v-slot="props">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(props.row.goods_id)"
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'List',
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb.vue'),
  },
  data() {
    return {
      //初始请求参数
      queryInfo: {
        query: ``,
        pagenum: 1,
        pagesize: 10,
      },
      //总列表条数
      total: 0,
      //商品列表
      goodsList: [],
    }
  },
  methods: {
    async getGoodsList() {
      let { data: res } = await this.$axios({
        url: `goods`,
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    //pageSize 改变时会触发
    handleSizeChange(size) {
      this.queryInfo.pagesize = size
      this.getGoodsList()
    },
    //currentPage 改变时会触发
    handleCurrentChange(num) {
      this.queryInfo.pagenum = num
      this.getGoodsList()
    },
    // 通过id删除列表
    async removeById(id) {
      let text = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((e) => e)
      if (text !== `confirm`) {
        return this.$message.error('取消删除成功')
      }
      let { data: res } = await this.$axios.delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success(res.meta.msg)
      this.getGoodsList()
    },
    //添加列表跳转页面
    goAddPage() {
      this.$router.push('/goods/add')
    },
  },
  created() {
    this.getGoodsList()
  },
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 14px;
}
</style>