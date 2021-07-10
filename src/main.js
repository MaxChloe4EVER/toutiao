import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// 引入移动端适配模块
import 'amfe-flexible'
// 加载全局样式
import './styles/index.less'
// 引入vant库
import Vant from 'vant'
import '../node_modules/vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
