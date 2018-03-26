import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Auth = {
    state: {
        auth: true,    // Авторизован ли пользователь
        user: {},   // Данные о пользователе
        token: {},  // Токен для API
    },
    mutations: {
        getAuthentication: (state, data) => {
            return Vue.axios.post('/ajax', data)
                .then(response => {
                    console.log(response.data)
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