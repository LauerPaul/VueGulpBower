import store from '../store.js'
import notify from '../../components/task/task.vue'

import headerLine from '../../components/common/header/header.vue'
import aside_menu from '../../components/common/aside/_aside.vue'

export default {
	data() {
		return {
			auth: store.state.Auth.auth,
			value: 0,
			query: false,
			show: true,
			
			// aside menu status toggle 
			asideMenuMin: false
		}
	},
	methods: {
	},
	components: {
		headerLine,
		aside_menu,
		notify
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