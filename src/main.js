import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import {routes} from "./routes";
import "leaflet/dist/leaflet.css"
import {store} from "./store/store";

import * as VueGoogleMaps from "vue2-google-maps";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBkSQ8kdH9R44slv1LvqZ4DEfI-J5oXecE",
    libraries: "places" // necessary for places input
  }
});

Vue.http.options.root = 'http://127.0.0.1:5000/';
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
