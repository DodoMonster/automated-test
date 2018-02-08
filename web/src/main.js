import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import axios from 'axios';
import index from '~/page/index.vue';
import addTask from '~/page/addTask.vue';
import addTest from '~/page/addTest.vue';
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
  path: '/addTask',
  component: addTask
}, {
  path: '/editTask/:id',
  component: addTask
}, {
  path: '/addTest',
  component: addTest
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