<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">参数列表</el-breadcrumb-item>
    </bread-crumb>

    <el-card>
      <el-alert
        show-icon
        :closable="false"
        type="warning"
        title="注意! 只允许为第三级分类设置相关参数"
      ></el-alert>
      <el-row class="cat_opt">
        <el-col class="btn_box">
          <span>选泽商品分类: </span>
          <!-- 商品分类级联选择框 -->
          <el-cascader
            v-model="selectCateKeys"
            :options="cateList"
            :props="casProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            :disabled="isBtnDisabled"
            type="primary"
            size="mini"
            @click="addDialogVisible = true"
            >添加参数</el-button
          >

          <el-table border :data="manyTableData">
            <el-table-column type="expand">
              <template v-slot="scoped">
                <el-tag
                  v-for="(item, i) in scoped.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scoped.row)"
                  >{{ item }}</el-tag
                >
                <!-- 添加标签的文本框 -->
                <el-input
                  v-if="scoped.row.inputVisible"
                  v-model="scoped.row.tagValue"
                  ref="saveTagInput"
                  size="small"
                  class="input-new-tag"
                  @keyup.enter.native="handleInputConfirm(scoped.row)"
                  @blur="handleInputConfirm(scoped.row)"
                >
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else size="small" @click="showInput(scoped.row)"
                  >添加 +</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scoped">
                <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="editForm(scoped.row)"
                  >编辑</el-button
                >
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  @click="deleteParams(scoped.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="静态属性" name="only">
          <el-button
            :disabled="isBtnDisabled"
            type="primary"
            size="mini"
            @click="addDialogVisible = true"
            >添加属性</el-button
          >

          <el-table border :data="onlyTableData">
            <el-table-column type="expand">
                <template v-slot="scoped">
                <el-tag
                  v-for="(item, i) in scoped.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scoped.row)"
                  >{{ item }}</el-tag
                >
                <!-- 添加标签的文本框 -->
                <el-input
                  v-if="scoped.row.inputVisible"
                  v-model="scoped.row.tagValue"
                  ref="saveTagInput"
                  size="small"
                  class="input-new-tag"
                  @keyup.enter.native="handleInputConfirm(scoped.row)"
                  @blur="handleInputConfirm(scoped.row)"
                >
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else size="small" @click="showInput(scoped.row)"
                  >添加 +</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scoped">
                <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="editForm(scoped.row)"
                  >编辑</el-button
                >
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  @click="deleteParams(scoped.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        
      </el-tabs>

      <!-- 分页 -->
      <slot name="pages"></slot>
    </el-card>

    <!-- 添加参数对话框 -->
    <el-dialog
      :title="`添加` + titleName"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form
        :model="addDialogForm"
        :rules="addDialogRules"
        label-width="100px"
        ref="addDialogRef"
      >
        <el-form-item :label="titleName" prop="attr_name">
          <el-input
            v-model="addDialogForm.attr_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数对话框 -->
    <el-dialog
      :title="`修改` + titleName"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form
        :model="editDialogForm"
        :rules="editDialogRules"
        label-width="100px"
        ref="editDialogRef"
      >
        <el-form-item :label="titleName" prop="attr_name">
          <el-input
            v-model="editDialogForm.attr_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Params',
  data() {
    return {
      //初始获取列表数据
      cateList: [],
      //级联选中项
      selectCateKeys: [],
      //级联配置对象
      casProps: {
        expandTrigger: 'hover',
        // checkStrictly: true,
        children: `children`,
        value: `cat_id`,
        label: `cat_name`,
      },
      //默认选中的标签页
      activeName: 'many',
      // 动态参数获取的数据
      manyTableData: [],
      // 静态获取的数据
      onlyTableData: [],
      //添加属性对话框是否显示
      addDialogVisible: false,
      //添加对话框表单验证规则
      addDialogRules: {
        attr_name: [
          { required: true, message: '请输参数名称', trigger: 'blur' },
        ],
      },
      //添加对话框的数据对象
      addDialogForm: {
        attr_name:``,
      },

      //修改属性对话框是否显示
      editDialogVisible: false,
      //修改对话框表单验证规则
      editDialogRules: {
        attr_name: [
          { required: true, message: '请输参数名称', trigger: 'blur' },
        ],
      },
      //修改对话框的数据对象
      editDialogForm: {},
      //删除对话框是否显示
      deleteDialogVisible: false,
    }
  },
  computed: {
    isBtnDisabled() {
      return this.selectCateKeys.length !== 3
    },
    titleName() {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    },
    cateId() {
      return this.selectCateKeys.length === 3 ? this.selectCateKeys[2] : null
    },
  },
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb'),
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$axios({
        url: 'categories',
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      this.cateList = res.data
    },
    //获取参数的函数
    async getParamsData() {
      let len = this.selectCateKeys.length
      if (len !== 3) {
        this.selectCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      let { data: res } = await this.$axios.get(
        `categories/${this.selectCateKeys[len - 1]}/attributes`,
        {
          params: {
            sel: this.activeName,
          },
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        ;(item.inputVisible = false), (item.tagValue = ``)
      })
      if (this.activeName === `many`) {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },
    //级联选择框选中项变化 触发函数
    handleChange() {
      this.getParamsData()
    },
    //tab 页签点击事件
    handleTabClick() {
      this.getParamsData()
    },
    //添加对话框关闭事件
    addDialogClose() {
      this.$refs.addDialogRef.resetFields()
    },
    //点击按钮添加获取参数
    addParams() {
      this.$refs.addDialogRef.validate(async (result) => {
        if (!result) return
        let { data: res } = await this.$axios({
          method: 'post',
          url: `categories/${this.cateId}/attributes`,
          data: {
            attr_name: this.addDialogForm.attr_name,
            attr_sel: this.activeName,
          },
        })
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.getParamsData()
        this.$message.success(res.meta.msg)
      })

      this.addDialogVisible = false
    },
    //修改对话框关闭事件
    editDialogClose() {
      this.$refs.editDialogRef.resetFields()
    },
    //编辑参数事件
    async editForm(props) {
      this.editDialogVisible = true
      let { data: res } = await this.$axios({
        url: `categories/${this.cateId}/attributes/${props.attr_id}`,
        params: {
          attr_sel: this.activeName,
          attr_vals:props.attr_vals
        },
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.editDialogForm = res.data
    },
    //点击按钮修改获取参数
    editParams() {
      this.$refs.editDialogRef.validate(async (result) => {
        if (!result) return
        let { data: res } = await this.$axios.put(
          `categories/${this.cateId}/attributes/${this.editDialogForm.attr_id}`,
          {
            attr_sel: this.activeName,
            attr_name: this.editDialogForm.attr_name,
            attr_vals: this.editDialogForm.attr_vals,
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getParamsData()
        this.editDialogVisible = false
      })
    },
    //删除参数事件
    async deleteParams(attr_id) {
      let result = await this.$confirm(
        '此操作将永久删除该参数, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((e) => {
        return e
      })
      if (result !== `confirm`) {
        this.$message.info('已取消删除')
      }
      let { data: res } = await this.$axios({
        method: 'delete',
        url: `categories/${this.cateId}/attributes/${attr_id}`,
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getParamsData()
    },
    //持久保存tag数据
    async saveSel(scoped) {
      let { data: res } = await this.$axios.put(
        `categories/${this.cateId}/attributes/${scoped.attr_id}`,
        {
          attr_name: scoped.attr_name,
          attr_sel: scoped.attr_sel,
          attr_vals: scoped.attr_vals.join(' '),
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    //输入框失去焦点和确定事件
    handleInputConfirm(scoped) {
      if (!scoped.tagValue.trim().length) {
        scoped.inputVisible = false
        scoped.tagValue = ``
        return
      }
      scoped.attr_vals.push(scoped.tagValue.trim())
      scoped.tagValue = ``
      scoped.inputVisible = false
      this.saveSel(scoped)
    },
    //输入框显示 事件
    showInput(scoped) {
      scoped.inputVisible = true

      this.$nextTick((_) => {
        this.$refs.saveTagInput.focus()
      })
    },
    //删除tag列表事件
    handleClose(i, row) {
      row.attr_vals.splice(i, 1)
      this.saveSel(row)
    },
  },
  created() {
    this.getCateList()
  },
}
</script>

<style lang="less" scoped>
.cat_opt,
.el-table {
  margin-top: 10px;
}
.el-tag {
  margin-right: 8px;
}
.input-new-tag {
  width: 60px;
}
</style>