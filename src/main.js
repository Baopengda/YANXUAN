import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './vantui/index'   // 引入vantui
import 'vant/lib/index.css';
import 'reset-css'; // 初始化样式库
import LoadMore from 'load-more-yuxialin' // 瀑布流插件

Vue.use(LoadMore)
Vue.config.productionTip = false
// 点击热门搜索事件
Vue.prototype.bus = new Vue()
// (busProduct)获取热门搜索的请求数据
Vue.prototype.busProduct = new Vue()
// 实时搜索功能
Vue.prototype.busHelper = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
