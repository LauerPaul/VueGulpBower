import querystring from 'querystring'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store.js'

Vue.use(Vuex)

const Auth = {
    state: {
        auth: false,        // Авторизован ли пользователь
        user: {},           // Данные о пользователе
        token: {},          // Токен для API
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
                console.log(response.data)
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
            console.log('User is auth');
            window.location.reload();
        },

        /**
         * "Выходим" из аккаунта и удаляем все данные с auth()
         * @param state
         */
        logout: (state) => {
            state.auth = false
            state.user = {}
            window.location.reload();
        }
    },
}

export default Auth