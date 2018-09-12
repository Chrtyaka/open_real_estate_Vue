import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {routes} from "./routes";
import HighChartsVue from "highcharts-vue"
import "leaflet/dist/leaflet.css"
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/material.css'
import {store} from "./store/store";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.use(VueTabs);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(HighChartsVue);
Vue.http.options.root = 'http://127.0.0.1:5000/';
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
