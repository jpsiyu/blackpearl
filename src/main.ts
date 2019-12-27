import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/default.css';

import '@/plugins/app';
import '@/plugins/element';
import '@/plugins/db';
import '@/plugins/shh';
import '@/plugins/clipboard';
import '@/plugins/axios';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
