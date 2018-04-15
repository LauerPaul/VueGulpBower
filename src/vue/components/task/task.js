import store from '../../system/store.js'

export default {
	computed: {
		snackbar:{
			get: function () {
				return store.state.Notify.snackbar
			},
			set: function (v) {
				store.state.Notify.snackbar = v
			}
		},
		text: function(){
			return store.state.Notify.text
		},
		timeout: function(){
			return store.state.Notify.timeout
		},
		mode: function(){
			return store.state.Notify.mode
		},
		color: function(){
			return store.state.Notify.color
		}
	},
	beforeMount: function (){
		store.state.Notify.snackbar = false
	}	
}