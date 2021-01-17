import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index"
import toast from 'components/common/toast'
// 解决移动端300毫秒的延迟
import FastClick from 'fastclick'
// 使用图片懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.prototype.$store = store

Vue.use(toast);

// 解决移动端300毫秒的延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/lazyload.png")
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
