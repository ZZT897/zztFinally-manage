import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Cookies from "js-cookie";
// Cookies.remove("username")
// Cookies.remove("id")
// Cookies.remove("isVip")

Vue.prototype.bus = new Vue()
Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

