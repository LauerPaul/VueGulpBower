import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import Auth from './auth'
import Access from './access'
import Notify from '@/plugins/notify.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
    modules: {
        Auth: Auth,
        Access: Access,
        Notify: Notify
    },
})

export default store