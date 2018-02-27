import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import axios from 'axios';
import index from '~/page/index.vue';
import scriptAdmin from '~/page/scriptAdmin.vue';
import taskAdmin from '~/page/taskAdmin.vue';
import userAdmin from '~/page/userAdmin.vue';
import projectAdmin from '~/page/projectAdmin.vue';

import 'element-ui/lib/theme-chalk/index.css';
import '~/css/main.css';


Vue.use(ElementUI);
Vue.use(VueRouter)
  .prototype.$http = axios;

const routes = [{
  path: '/',
  component: index
}, {
  path: '/index',
  component: index
}, {
  path: '/scriptAdmin',
  component: scriptAdmin
}, {
  path: '/scriptAdmin/:id',
  component: scriptAdmin
}, {
  path: '/taskAdmin',
  component: taskAdmin
}, {
  path: '/userAdmin',
  component: userAdmin
}, {
  path: '/projectAdmin',
  component: projectAdmin
}];

const router = new VueRouter({
  routes
});


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});