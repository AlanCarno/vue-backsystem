import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
// 暂时关闭mock，与axios请求登录冲突
// import './mock/mockServe';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
