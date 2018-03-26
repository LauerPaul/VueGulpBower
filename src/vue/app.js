import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'

import core from './system/core/core.vue'
import store from './system/store.js'
import router from './system/router.js'

import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'babel-polyfill'

Vue.config.productionTip = false

// -------------------
// --- include modules
// -------------------
// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueHead)
Vue.use(VeeValidate)
Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
Vue.use(BootstrapVue);

// -------------------
// Axios settings
// -------------------
axios.defaults.baseURL = 'https://test.froggy.tours/admin/ajax'; // base url
axios.defaults.headers.common['X-CSRF-TOKEN'] = 'Bearer ' + '0000';    // Токен

// -------------------
// --- vue core init
// -------------------
var vm = new Vue({
  el: '#app-wrapper',
  router,
  render: h => h(core)
})
