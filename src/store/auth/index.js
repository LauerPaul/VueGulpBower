import querystring from 'querystring'
import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store'

Vue.use(Vuex)

const Auth = {
    state: {
        auth: false,        // Авторизован ли пользователь
        user: {},           // Данные о пользователе
        token: {},          // Токен для API
        isAdmin: false,
        isModerator: false,
        isManager: false,
        isSeoDev: false,
    },
    mutations: {
        getAuthentication: (state, data) => {
            return Vue.axios({
                method: 'post',
                url: '/',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: querystring.stringify(data)
            }).then(function(response, headers){
                const notify = response.data

                if(response.data.status == "ERROR") {
                    store.commit('error', notify);
                }
                else {
                    store.commit('auth', response.data.userData);
                }
            })
        },

        /**
         * Сохраняем данные токена
         * @param state
         */
        tokenAuth: (state, token) => {
            state.token = token
        },

        /**
         * Сохраняем информацию о том, что пользователь авторизован
         * @param state
         * @param data
         */
        auth: (state, data) => {
            state.auth = true
            state.user = data
            store.commit('stasusSet');
        },

        stasusSet (state, data) {
            if(parseInt(state.user.is_admin)) {
                state.isAdmin = true
                console.log('is_admin');
            } else {
                state.isAdmin = false
            }

            if(parseInt(state.user.is_moderator)) {
                state.isModerator = true
                console.log('is_moderator');
            } else {
                state.isModerator = false
            }

            if(parseInt(state.user.is_manager)) {
                state.isManager = true
                console.log('is_manager');
            } else {
                state.isManager = false
            }

            if(parseInt(state.user.is_seo)) {
                state.isSeoDev = true
                console.log('is_seo');
            } else {
                state.isSeoDev = false
            }
        },

        /**
         * "Выходим" из аккаунта и удаляем все данные с auth()
         * @param state
         */
        logout: (state) => {
            state.auth = false
            state.user = {}
        }
    },
}

export default Auth