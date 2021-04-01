<template>
  <el-container class="home_cotainer">
    <el-header class="flex">
      <div>
        <img src="../assets/logo.jpg" alt="" />
        <span>后台管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!--   侧边栏菜单 -->
      <el-aside :width="!iscollapse ? `200px` : `64px`">
        <div class="toggle-button" @click="collapse">─ <br />─ <br />─</div>
        <el-menu
          :default-active="activePath"
          router
          unique-opened
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eef"
          :collapse="iscollapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ``"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 小图标 -->
              <i :class="[`iconfont`, iconList[item.id]]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->

            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="`/` + subItem.path"
              @click="saveNavstate(`/` + subItem.path)"
            >
              <template slot="title">
                <!-- 小图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 内容页 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      activePath: ``,
      iscollapse: false,
      menuList: [],
      iconList: {
        125: 'icon-yonghu',
        103: 'icon-lifangtilitiduomiantifangkuai2',
        101: 'icon-shangpinguanli',
        102: 'icon-dingdanguanli',
        145: 'icon-shujutongji',
      },
    }
  },
  components: {},
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      try {
        let { data: res } = await this.$axios({
          url: 'menus',
        })

        // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menuList = [...res.data]
      } catch (e) {
        console.log(e)
      }
    },
    collapse() {
      this.iscollapse = !this.iscollapse
    },
    saveNavstate(path) {
      window.sessionStorage.setItem('pathname', path)
      this.activePath = path
    },
  },
  created() {
    this.activePath = sessionStorage.getItem('pathname')
    this.getMenuList()
  },
}
</script>


<style lang="less" scoped>
.home_cotainer {
  height: 100%;

  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-header {
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  font-size: 20px;
  img {
    width: 100px;
    vertical-align: middle;
  }
  span {
    margin-left: 15px;
  }
}
.el-aside {
  overflow: hidden;
  .toggle-button {
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 6px;
    color: #fff;
    background-color: #4a5064;
    text-align: center;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;

    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>