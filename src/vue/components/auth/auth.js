import store from '../../system/store.js'
import bubbles from '../animation/bubbles.vue'

export default {
	data: () => ({
		valid: true,
		loader: null,
		loading: false,
		hidePass: true,
		
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
	}),
	methods: {
		submit () {
			if (this.$refs.form.validate()) {
				const data = {
						login: this.login,
						passwd: this.password,
						checkbox: this.checkbox
					}
				store.commit('getAuthentication', data, this.clear);
			}
		},
		clear (data) {
			// this.$refs.form.reset() @froggy.tours
				// this.loading = false
				console.log(data.status);
				console.log('test');
				console.log(data);
			if(data.status == 'ERROR') {
			}
		}		
	},
	watch: {
      loader () {
		const l = this.loader
		this[l] = !this[l]
		this.loader = null
      }
    },
    components: {
    	bubbles
    }
}