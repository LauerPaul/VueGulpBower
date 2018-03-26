import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
	data: () => ({
		valid: true,
		login: '',
		loginRules: [
			v => !!v || 'Логин - обязательное поле!',
			v => (v && v.length >= 2) || '...'
		],
		password: '',
		passwordRules: [
			v => !!v || 'Пароль - обязательное поле!',
			v => (v && v.length >= 5) || 'Не менее 5 символов!'
		],
		hidePass: true,
		checkbox: false
	}),

	methods: {
		submit () {
			console.log(this);
			console.log(Vue);
			console.log(Vue.Auth);
			if (this.$refs.form.validate()) {
				// Native form submission is not yet supported
				return Vue.axios.post('/', {
					name: this.name,
					password: this.password,
					checkbox: this.checkbox
				})
                .then(response => {
                    console.log(response.data)
                    return response.data
                })
                .catch(e => {
					console.log(e);
				})
			}
		},
		clear () {
			this.$refs.form.reset()
		}
	}
}