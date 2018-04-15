import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import Auth from './auth.js'
import Notify from './notify.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
    modules: {
        Auth: Auth,
        Notify: Notify
    },
})

export default store