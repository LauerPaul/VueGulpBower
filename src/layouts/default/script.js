import notify from '@/components/task'
import headerLine from '@/components/common/header'
import aside_menu from '@/components/common/aside'

export default {
	data() {
		return {
			auth: this.$root.store.state.Auth.auth,
			value: 0,
			query: false,
			show: true,
			locationClass: this.$route.name,
			// aside menu status toggle 
			asideMenuMin: false,
			progress: {
				value: 0,
				query: false,
				show: true,
				interval: 0
			}
		}
	},
	created () {
        this.$Progress.start()
	},
	mounted: function(){
        this.$Progress.finish()
	},
	beforeUpdate() {
        this.$Progress.start()
	},
	updated(){
        this.$Progress.finish()
	},
	methods: {
	},
	components: {
		headerLine,
		aside_menu,
		notify
	},
	 watch: {
    	'$route' (to, from) {
    		this.locationClass = this.$route.name;
      	},
      	'$root.store.state.Auth.auth': function (v) {
      		if(this.$root.store.state.Auth.auth){
	      		this.$router.push({name: 'home'});
      		}
      		else {
	      		this.$router.push({name: 'login'});
      		}

      		this.auth = this.$root.store.state.Auth.auth;
      	},
    }
}
// export default {
//   name: 'app',
//   data () {
//     return {
//       msg: 'Welcome to Your Vue.js App'
//     }
//   },
//   head: {
//     // To use "this" in the component, it is necessary to return the object through a function
//     title: function () {
//       return {
//         inner: 'My Title'
//       }
//     },
//     meta: [
//       { name: 'description', content: 'My description', id: 'desc' }
//     ]
//   },
//   created() {
//     axios.get('http://test.froggy.tours/ajax/admin')
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(e => {
//       console.log(e);
//     })
//   }
// }