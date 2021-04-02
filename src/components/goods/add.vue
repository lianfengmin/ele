<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item slot="second">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item slot="three">添加商品</el-breadcrumb-item>
    </bread-crumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 提示区 -->
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <!-- 进度条 -->
      <el-steps
        align-center
        :space="200"
        :active="+activeIndex"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!--  tab兰区域-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :before-leave="beforeTabLeave"
          v-model="activeIndex"
          tab-position="left"
          @tab-click="tabClick"
        >
          <el-tab-pane name="0" label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <!-- 商品数据级联 -->
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="goodsList"
                :props="goodsOption"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="1" label="商品参数">
            <el-form-item
              v-for="item in manyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  v-for="(item, ind) in item.attr_vals"
                  :key="ind"
                  :label="item"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品属性">
            <el-form-item
              v-for="item in onlyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"> </el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品图片">
            <el-upload
              :action="$axios.defaults.baseURL + `upload`"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane name="4" label="商品内容">
            <!-- 富文本编辑器 -->
            <quill-editor
              v-model="addForm.goods_introduce"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
            <el-button type="primary" class="btn-add" @click="addGoods"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- 图片预览 -->
      <el-dialog title="图片预览" :visible.sync="showImg" width="50%">
        <img :src="tmp_path" alt="" style="width: 100%" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Add',
  components: {
    BreadCrumb: () => import('../component_slot/breadCrumb.vue'),
  },
  data() {
    return {
      //获取的所有商品列表
      goodsList: [],
      //进度条默认位置
      activeIndex: 0,
      //商品表单数据
      addForm: {
        goods_name: ``, //商品名字
        goods_price: 0, //商品价格
        goods_weight: 0, //商品重量
        goods_number: 0, //商品数量
        goods_cat: [], //商品所属分类的cat_id列表
        pics: [], //图片地址列表
        goods_introduce: ``, //商品内容
        attrs: [],
      },
      //商品表单验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' },
        ],
      },
      //级联选择器配置
      goodsOption: {
        expandTrigger: 'hover', //子菜单的打开方式
        // checkStrictly: true, //父子节点是否严格不关联
        label: `cat_name`, //选中项标签内展示内容是选项对象哪个属性值
        value: `cat_id`, //选中项的值  数据源对象中的哪个属性值
        children: `children`, //子选项为选项对象的哪个属性值
      },
      //商品参数列表
      manyTableData: [],
      //商品参数列表
      onlyTableData: [],
      //上传图片的请求头
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      //预览图片窗口控制
      showImg: false,
      //点击的预览图片的地址
      tmp_path: ``,
      //富文本编辑器配置
      editorOption: {},
    }
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      } else {
        return null
      }
    },
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$axios({
        url: 'categories',
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.goodsList = res.data
    },
    //级联器选中项变化事件
    handleChange(e) {
      let len = e.length
      if (len !== 3) {
        this.addForm.goods_cat = []
      }
    },
    //tab标签切换前的函数
    beforeTabLeave(n, o) {
      if (o == 0 && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
    //tab标签点击事件
    async tabClick() {
      let sel = ``
      switch (this.activeIndex) {
        case `1`:
          sel = `many`
          break
        case `2`:
          sel = `only`
          break
      }
      if (this.activeIndex === `1` || this.activeIndex === `2`) {
        let { data: res } = await this.$axios({
          url: `categories/${this.cateId}/attributes`,
          params: { sel },
        })
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }

        if (sel === 'many') {
          res.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
          })

          this.manyTableData = res.data
        } else if (sel === 'only') {
          this.onlyTableData = res.data
        }
      }
    },
    // 点击已上传的文件事件函数
    handlePreview({ response }) {
      this.tmp_path = response.data.url
      this.showImg = true
    },
    //删除已上传文件事件函数
    handleRemove({ response }) {
      let filePath = response.data.tmp_path
      let i = this.addForm.pics.findIndex((item) => item.pic === filePath)
      this.addForm.pics.splice(i, 1)
      console.log(i, this.addForm.pics)
    },
    //监听图片上传成功函数
    handleSuccess(res) {
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      let piceInfo = {
        pic: res.data.tmp_path,
      }
      this.$message.success(res.meta.msg)
      this.addForm.pics.push(piceInfo)
    },
    //添加商品
    addGoods() {
      this.$refs.addFormRef.validate(async (result) => {
        //判断表单验证是否通过
        if (!result) {
          return this.$message.error('请输入必要的表单内容')
        }

        this.manyTableData.forEach((item) => {
          let manyInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          }
          this.addForm.attrs.push(manyInfo)
        })

        this.onlyTableData.forEach((item) => {
          let onlyInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          }
          this.addForm.attrs.push(onlyInfo)
        })

        let { data: res } = await this.$axios({
          method: 'post',
          url: `goods`,
          data: {
            ...this.addForm,
            goods_cat: this.addForm.goods_cat.join(','),
          },
        })
        if (res.meta.status !== 201) {
          this.addForm.attrs = []
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.$router.push('/goods')
      })
    },
  },
  created() {
    this.getCateList()
  },
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0;
  /deep/.el-step__title {
    font-size: 13px;
  }
}
.el-checkbox {
  margin: 0 10px 5px 0 !important;
}
/deep/.ql-editor {
  min-height: 300px;
}
.btn-add {
  margin-top: 15px;
}
</style>