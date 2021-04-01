<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">商品分类</el-breadcrumb-item>
    </bread-crumb>
    <card>
      <el-button slot="btn" type="primary" @click="showAddCateDialog">
        添加分类
      </el-button>
      <!-- 表格 -->
      <tree-table
        slot="table"
        border
        index-text="#"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
      >
        <!-- 是否有效 -->
        <template v-slot:isok="scope">
          <!-- {{ scope.row}} -->
          <i
            class="el-icon-success"
            v-if="!scope.row.cat_deleted"
            style="color: green"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template v-slot:order="scope">
          <el-tag size="mini" v-if="!scope.row.cat_level">一级</el-tag>
          <el-tag type="success" size="mini" v-if="scope.row.cat_level == 1"
            >二级</el-tag
          >
          <el-tag type="warnin" size="mini" v-if="scope.row.cat_level == 2"
            >三级</el-tag
          >
        </template>
        <template v-slot:opt="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editname(scope.row)"
            >编辑 <i class=""></i
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteDialog(scope.row)"
            >删除
            <i class=""></i>
          </el-button>
        </template>
      </tree-table>

      <!-- 分页 -->
      <el-pagination
        slot="pages"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </card>

    <!-- 分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        label-width="80px"
        :rules="addCateFormRules"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="casCaderProps"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editInfo" label-width="80px">
        <el-form-item label="分类名称" prop="cat_id">
          <el-input v-model="editInfo.cat_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upEditName">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除对话框 -->
    <el-dialog title="删除分类" :visible.sync="deleteDialogVisible" width="50%">
      <el-form :model="editInfo" label-width="80px">
        <el-form-item label="分类名称" prop="cat_id">
          <el-input v-model="removeInfo.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分类id" prop="cat_id">
          <el-input v-model="removeInfo.cat_id"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCateById">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '../component_slot/breadCrumb.vue'
export default {
  name: 'Cate',
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb.vue'),
    Card: () => import('../component_slot/card.vue'),
  },
  data: function () {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      queryInfo: {
        pagenum: 1,
        type: 3,
        pagesize: 5,
      },
      cateList: [],
      total: 0, //总数据条数
      columns: [
        {
          label: `分类名称`,
          prop: `cat_name`,
        },
        {
          label: `是否有效`,
          prop: `cat_deleted`,
          type: 'template', //表示当前列为模板列
          template: 'isok', //模板名称
        },
        {
          label: `排序`,
          prop: `cat_level`,
          type: 'template', //表示当前列为模板列
          template: 'order', //模板名称
        },
        {
          label: `操作`,
          type: 'template', //表示当前列为模板列
          template: 'opt', //模板名称
        },
      ], //为table指定列定义

      //编辑分类名字数据对象
      editInfo: {
        cat_id: 0,
        cat_name: ``,
      },
      //删除分类名字数据对象
      removeInfo: {
        cat_id: 0,
        cat_name: ``,
      },
      //添加分类表单的数据对象
      addCateForm: {
        cat_name: ``, //分类名字
        cat_pid: 0, //父类id
        cat_level: 0, //分类的等级 默认是1级分类
      },
      //添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      //添加分类获取的父级数据
      parentCateList: [],
      //级联选择器的配置对象
      casCaderProps: {
        expandTrigger: 'hover',
        value: `cat_id`,
        label: `cat_name`,
        children: `children`,
        checkStrictly: true,
      },
      //选中的父级分类id数组
      selectedKeys: [],
    }
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$axios({
        url: 'categories',
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.cateList = res.data.result
      this.total = res.data.total
    },
    //监听pagesize改变
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.getCateList()
    },
    //监听pagenum改变
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage
      this.getCateList()
    },
    //点击按钮添加展示对话框
    showAddCateDialog() {
      this.getParentCateList()
      this.addDialogVisible = true
    },
    //获取父级分类数据列表
    async getParentCateList() {
      let { data: res } = await this.$axios({
        url: 'categories',
        params: { type: 2 },
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.parentCateList = res.data
    },
    //选泽项变花触发
    parentCateChanged(value) {
      let len = value.length
      if (len) {
        this.addCateForm.cat_pid = value[len - 1]
        this.addCateForm.cat_level = value.length
        return
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    // 点击确定按钮触发
    addCate() {
      this.$refs.addCateFormRef.validate(async (result) => {
        if (!result) return
        let { data: res } = await this.$axios({
          method: 'post',
          url: 'categories',
          data: this.addCateForm,
        })
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
        this.getCateList()
        this.addDialogVisible = false
      })
      //   this.addDialogVisible = false
    },
    //监听对话框关闭事件 重置表单
    addDialogClose() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },
    //监听编辑分类名字对话框显示
    editname({ cat_name, cat_id }) {
      this.editInfo.cat_id = cat_id
      this.editInfo.cat_name = cat_name
      this.editDialogVisible = true
    },
    //监听编辑分类 对话框确定
    async upEditName() {
      let { data: res } = await this.$axios.put(
        'categories/' + this.editInfo.cat_id,
        {
          cat_name: this.editInfo.cat_name,
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.editDialogVisible = false
      this.getCateList()
    },
    //通过id删除分类对话框显示
    deleteDialog({ cat_id, cat_name }) {
      this.removeInfo.cat_name = cat_name
      this.removeInfo.cat_id = cat_id
      this.deleteDialogVisible = true
    },
    //通过id删除分类
    async deleteCateById() {
      let { data: res } = await this.$axios.delete(
        'categories/' + this.removeInfo.cat_id
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.getCateList()
      this.$message.success(res.meta.msg)
      this.deleteDialogVisible = false
    },
  },
  created() {
    this.getCateList()
  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>