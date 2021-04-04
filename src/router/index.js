import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



//导入页面级路由
import routes from "./pages.js"

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,

})

// 全局路由前置守卫 验证token
router.beforeEach((to, from, next) => {

  if (to.path === "/login") {
    return next()
  }
  let tokenstr = window.sessionStorage.getItem("token")
  if (!tokenstr) {
    return next("/login")


  }
  next()
})


router.afterEach((to, from) => {

})

export default router
