import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载移动端适配模块
import 'amfe-flexible'

// 加载全局样式
import './styles/index.less'

// 导入所有组件
import Vant from 'vant'
import '../node_modules/vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
