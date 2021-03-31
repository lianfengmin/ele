<template>
  <div class="rights_contianer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table border style="width: 100%" :data="rightsList">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scoped">
            <el-tag v-if="scoped.row.level == 0"> 1</el-tag>
            <el-tag type="warning" v-if="scoped.row.level == 2"> 3</el-tag>
            <el-tag type="success" v-if="scoped.row.level == 1"> 2</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data: function () {
    return {
      rightsList: [],
    }
  },

  methods: {
    async getRrightsList() {
      try {
        let { data: res } = await this.$axios({
          url: `rights/list`,
        })
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取权限列表失败')
        }
        this.rightsList = JSON.parse(JSON.stringify(res.data))
        res.data[0].pid = 230
      } catch (e) {
        console.log(e)
      }
    },
  },
  created() {
    this.getRrightsList()
  },
}
</script>

<style lang="less" scoped>
</style>