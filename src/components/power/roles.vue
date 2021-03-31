<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">角色列表</el-breadcrumb-item>
    </bread-crumb>

    <el-card>
      <!-- 添加角色 -->
      <div class="addBtn">
        <el-button type="primary">添加角色</el-button>
      </div>

      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand" label="更多">
          <template v-slot="scoped">
            <el-row
              v-for="(item1, index) in scoped.row.children"
              :key="item1.id"
              :class="[`bdbtm`, index === 0 ? `bdtop` : ``]"
            >
              <!-- 1级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scoped.row, item1.id)">
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 2,3级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="index2"
                  :class="[index2 === 0 ? `` : `bdtop`]"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scoped.row, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18" class="inRow">
                    <el-tag
                      type="warning"
                      v-for="(item3, index3) in item2.children"
                      :key="index3"
                      closable
                      @close="removeRightById(scoped.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column width="300px" label="操作" prop="roleName" class="set">
          <template v-slot="scoped">
            <el-button type="primary" icon="el-icon-edit" size="mini">
              编辑
            </el-button>

            <el-button type="warning" icon="el-icon-delete" size="mini"
              >删除</el-button
            >

            <el-button
              type="danger"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scoped.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightsList"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="treeRef"
        :default-checked-keys="checkedId"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data: function () {
    return {
      setRightDialogVisible: false, //分配权限对话框石否显示
      rolesList: [], //所有角色列表
      rightsList: [], //权限列表
      defaultProps: {
        //树形控件的属性绑定对象
        children: `children`,
        label: `authName`,
      },
      checkedId: [], //树形控件默认勾选的id
      roleId: ``, //即将分配权限的角色Id
    }
  },
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb.vue'),
  },

  methods: {
    //初始获取用户权限列表
    async getRolesList() {
      let { data: res } = await this.$axios({
        url: 'roles',
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rolesList = res.data.map((item) => {
        return { ...item }
      })
    },
    //根据id 删除用户列表权限
    async removeRightById(role, rightId) {
      let result = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((e) => e)
      if (result !== `confirm`) {
        return this.$message.info('取消了删除')
      }
      let { data: res } = await this.$axios({
        url: 'roles/' + role.id + '/rights/' + rightId,
        method: 'delete',
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      this.$message.success(res.meta.msg)
      role.children = res.data.map((item) => {
        return { ...item }
      })
    },
    //用户权限列表展示
    async showSetRightDialog(role) {
      this.roleId = role.id
      let { data: res } = await this.$axios({
        url: `rights/tree`,
      })
      if (res.meta.status !== 200) {
        return this.$message.info(res.meta.msg)
      }
      this.rightsList = res.data
      this.checkedId = []
      this.getLeafKeys(role, this.checkedId)
      this.setRightDialogVisible = true
    },
    //获取角色下所有三级权限的id保存到checkId中
    getLeafKeys(node, arr) {
      //如果当前节点不包含children属性则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr)
      })
    },
    //点击为角色分配权限
    async allotRights() {
      let keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      let idStr = keys.join(',')
      let { data: res } = await this.$axios({
        method: `post`,
        url: `roles/${this.roleId}/rights`,
        data: { rids: idStr },
      })

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getRolesList()
      this.setRightDialogVisible = false
    },
  },

  created() {
    this.getRolesList()
    console.log(this);
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 8px;
}
.bdbtm {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
.addBtn {
  width: 98px;
  margin-bottom: 10px;
}
.left {
  align-items: center;
}
</style>