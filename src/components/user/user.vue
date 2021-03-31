<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 搜索区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="请输入内容"
            class="input-with-select"
            v-model="queryInfo.query"
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table border :data="userList" stripe fit>
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="角色" prop="role_name"> </el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="props">
            <el-switch
              v-model="props.row.mg_state"
              @change="userStateChange(props.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 用户操作 -->
        <el-table-column label="操作" width="174px">
          <template v-slot="scoped">
            <!-- 修改 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scoped.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scoped.row)"
              ></el-button>
            </el-tooltip>
            <!-- 删除用户 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scoped.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      @close="addDialogClose"
      width="50%"
    >
      <!-- 内容区域 -->
      <el-form
        label-width="70px"
        ref="addFormRef"
        props="username"
        :model="addForm"
        :rules="addFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="60%"
      @close="editDialogClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      @close="closeDialog"
      width="50%"
    >
      <p>当前用户: {{ userInfo.username }}</p>
      <p>当前角色: {{ userInfo.role_name }}</p>
      <p>
        分配新角色:
        <el-select v-model="selectRoleId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: function () {
    //邮箱验证规则
    let checkEmail = (rule, val, cb) => {
      let regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(val)) {
        return cb()
      } else {
        cb(new Error('请输入正确邮箱'))
      }
    }

    //手机验证规则
    let checkMobel = (rule, val, cb) => {
      let regMobel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobel.test(val)) {
        return cb()
      } else {
        cb(new Error('请输入正确手机号码'))
      }
    }
    return {
      //添加用户页面是否显示
      addDialogVisible: false,
      //修改用户页面是否显示
      editDialogVisible: false,
      //需要修改用户的信息
      editForm: {},
      //修改表单的验证规则
      editFormRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            validator: checkEmail,
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            validator: checkMobel,
          },
          {
            min: 11,
            max: 11,
            message: '长度为 11 个字符',
            trigger: 'blur',
          },
        ],
      },
      //添加的用户信息请求字段
      addForm: {
        username: ``,
        password: ``,
        email: ``,
        mobile: ``,
      },
      //表单验证规则
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },

          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            validator: checkEmail,
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            validator: checkMobel,
          },
          {
            min: 11,
            max: 11,
            message: '长度为 11 个字符',
            trigger: 'blur',
          },
        ],
      },

      //初始请求后台的字段
      queryInfo: {
        query: ``,
        pagenum: 1,
        pagesize: 2,
      },
      //从后台请求的用户信息
      userList: [],
      //后台返回用户信息的总条数
      total: 0,
      //控制角色分配对话框显示隐藏
      setRoleDialogVisible: false,
      //每一列的角色数据
      userInfo: [],
      //所有角色数据列表
      rolesList: [],
      //已选中角色Id值
      selectRoleId: ``,
    }
  },
  methods: {
    //当每页显示数据数变化
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getUserList()
    },
    // 当用户切换页码
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getUserList()
    },
    //获取接口信息
    async getUserList() {
      try {
        let { data: res } = await this.$axios({
          url: 'users',
          params: this.queryInfo,
        })
        if (res.meta.status === 200) {
          this.total = res.data.total
          this.userList = [...res.data.users]
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    //当状态改变
    async userStateChange(userInfo) {
      try {
        let { data: res } = await this.$axios({
          method: 'put',
          url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
        })
        if (res.meta.status === 200) {
          return this.$message.success(res.meta.msg)
        } else {
          userInfo.mg_state = !userInfo.mg_state
          this.$message.error(res.meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    //当添加用户对话框关闭
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    //添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (result) => {
        if (!result) return
        let { data: res } = await this.$axios({
          method: 'post',
          url: 'users',
          data: this.addForm,
        })
        if (res.meta.status === !201) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    //展示 修改用户的对话框
    async showEditDialog({ id }) {
      this.editDialogVisible = true
      try {
        let { data: res } = await this.$axios({
          method: 'get',
          url: 'users/' + id,
        })
        if (res.meta.status === !200) {
          return this.$message.error(res.meta.msg)
        }
        this.editForm = { ...res.data }
      } catch (e) {
        console.log(e)
      }
    },
    //修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (result) => {
        if (!result) return
        let { data: res } = await this.$axios.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        })
        if (res.meta.status === !200) {
          this.$message.error(res.meta.msg)
        }

        this.editDialogVisible = false
        this.getUserList()
        this.$message.success(res.meta.msg)
      })
    },
    //删除用户信息
    async removeUserById(id) {
      let confiremResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((e) => e)
      if (confiremResult !== `confirm`) {
        return this.$message.info('已取消删除')
      }
      let { data: res } = await this.$axios({
        url: 'users/' + id,
        method: 'delete',
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getUserList()
    },
    //监听修改用户对话框的关闭事件
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    //控制对话框
    async setRole(userInfo) {
      this.userInfo = userInfo

      let { data: res } = await this.$axios({
        url: 'roles',
      })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.rolesList = [...res.data]
      this.setRoleDialogVisible = true
    },
    //保存分配的新角色
    async saveRoleInfo() {
      if (!this.selectRoleId) {
        return this.$message.error(`请选择要分配的角色`)
      }
      let { data: res } = await this.$axios.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectRoleId,
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.getUserList()
      this.$message.success(res.meta.msg)
      this.setRoleDialogVisible = false
    },
    //分配角色对话框关闭事件
    closeDialog(){
      this.selectRoleId=``
    }
  },
  created() {
    this.getUserList()
  },
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.el-dialog {
  p {
    text-align: left;
  }
}
</style>