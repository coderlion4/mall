import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import VueLazyLoad from "vue-lazyload"

import FastClick from "fastclick"

import toast from "components/common/toast"


Vue.config.productionTip = false

Vue.use(toast);

// 解决移动端点击300ms延迟
FastClick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/placeholder.png")
});

// 事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
