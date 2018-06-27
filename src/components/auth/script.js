import bubbles from '@components/animation/bubbles'

export default {
	data: () => ({
		valid: true,
		loader: null,
		loading: false,
		hidePass: true,
		submit_: false,
		
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
				this.loader = 'loading';

				const data = {
						login: this.login,
						passwd: this.password
					}

				this.store.commit('getAuthentication', data);
				this.loader = null;
				this.loading = false;
				this.$refs.form.inputs[1].reset()
			}
		},
		clear () {
			// this.$refs.form.reset()
			// this.loading = false
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