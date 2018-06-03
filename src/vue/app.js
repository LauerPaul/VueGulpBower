import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jsonp from 'axios-jsonp-pro'
// import jsonpAdapter from 'axios-jsonp'
import VueCookie from 'vue-cookie'
import VueHead from 'vue-head'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'

import core from './system/core/core.vue'
import store from './system/store.js'
import router from './system/router.js'

import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'babel-polyfill'

import translite from './system/transliteration.js'
import querystring from 'querystring'

import VueProgressBar from 'vue-progressbar'

// // From some method in one of your Vue components 
// this.$cookie.set('test', 'Hello world!', 1);
// // This will set a cookie with the name 'test' and the value 'Hello world!' that expires in one day 
 
// // To get the value of a cookie use 
// this.$cookie.get('test');
 
// // To delete a cookie use 
// this.$cookie.delete('test');


Vue.config.productionTip = false

// -------------------
// --- include modules
// -------------------
// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(VueAxios, axios)
Vue.use(VueHead)
Vue.use(VeeValidate)
Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    blue: '#0593c4'
  }
})
Vue.use(BootstrapVue);
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

// -------------------
// Axios settings
// -------------------
axios.defaults.baseURL = 'http://test.froggy.tours/admin/ajax'; 		// base url
// axios.defaults.headers.common['X-CSRF-TOKEN'] = 'Bearer ' + '0000';    	// Токен

// -------------------
// --- vue core init
// -------------------
var vm = new Vue({
  el: '#app-wrapper',
  data: {
    translite,
    domain: 'http://test.froggy.tours',
    querystring,
    store
  },
  router,
  render: h => h(core)
})
