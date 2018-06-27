import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import VeeValidate from 'vee-validate'
// import VueResource from 'vue-resource'
// import jsonp from 'axios-jsonp-pro'
// import jsonpAdapter from 'axios-jsonp'
import 'babel-polyfill'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import querystring from 'querystring'

import layout from './layouts/default'
import store from './store'
import router from './router'

import translite from './plugins/transliteration.js'
import random from './plugins/random.js'

import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

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
// --- vue layout init
// -------------------
var vm = new Vue({
  el: '#app-wrapper',
  data: {
    translite,
    random,
    domain: 'http://test.froggy.tours',
    querystring,
    store
  },
  router,
  render: h => h(layout)
})
