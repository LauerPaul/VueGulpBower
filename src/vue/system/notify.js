const Notify = {
	state: {
		snackbar: false,
		color: '',
		mode: '',
		timeout: 6000,
		text: '',
	},
    mutations: {
		error: (state, data) => {
			setTimeout(function(){
				state.snackbar = false
				state.text = ''
			}, 6500)
			state.text = data.error
			state.snackbar = true
			state.color = 'error'
		},
		success: (state, data) => {
			setTimeout(function(){
				state.snackbar = false
				state.text = ''
			}, 6500)
			state.text = data
			state.snackbar = true
			state.color = 'success'
		}
	}
}

export default Notify