import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

//自定义样式
import "./assets/utils/index.css"

//echarts的组件
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers';
// 注册必须的组件
echarts.use(
  [TitleComponent, LineChart, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);





//导入element
import "./plugins/element"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/icons/iconfont.css"//阿里图标样式

//导入axios
import axios from "./axios/index.js"
Vue.prototype.$axios = axios

//导入vue树状插件
import TableTree from 'vue-table-with-tree-grid'
Vue.component("tree-table", TableTree)

//富文本编辑器插件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.config.productionTip = false

//全局格式化时间过滤器
Vue.filter("formatTime", (time) => {
  const dt = new Date(time)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + ``).padStart(2, `0`)
  const d = (dt.getDate() + ``).padStart(2, `0`)
  const h = (dt.getHours() + ``).padStart(2, `0`)
  const mm = (dt.getMinutes() + ``).padStart(2, `0`)
  return `${y}-${m}-${d} ${h}:${mm}`
})


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
