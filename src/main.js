import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

//自定义样式
import "./assets/utils/index.css"



//导入element
import "./plugins/element"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/icons/iconfont.css"//阿里图标样式

//导入axios
import axios from "./axios/index"
Vue.prototype.$axios = axios

//导入vue树状插件
import TableTree from 'vue-table-with-tree-grid'
Vue.component("tree-table", TableTree)

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
