import Vue from 'vue';
import App from './App.vue';
import 'vue-material/dist/theme/default.css';
import 'vue-material/dist/vue-material.min.css';
// later in your source files
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
