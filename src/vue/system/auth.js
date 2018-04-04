// import jsonpAdapter from 'axios-jsonp'
import querystring from 'querystring'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Auth = {
    state: {
        auth: false,    // Авторизован ли пользователь
        user: {},   // Данные о пользователе
        token: {},  // Токен для API
    },
    mutations: {
        getAuthentication: (state, data, callback) => {
            return Vue.axios({
                method: 'post',
                url: '/',
                withCredentials: true,
                // adapter: jsonpAdapter,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: querystring.stringify(data)
            }).then(function(response, headers){
                console.log(response.data)
                console.log(headers)
                return response.data
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
        },

        /**
         * "Выходим" из аккаунта и удаляем все данные с auth()
         * @param state
         */
        logout: (state) => {
            state.auth = false
            state.user = {}
            state.user = {}
        }
    },
}

export default Auth