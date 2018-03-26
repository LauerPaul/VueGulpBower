import store from '../store.js'
import headerLine from '../../components/common/header/header.vue'
import aside from '../../components/common/aside/aside.vue'

export default {
	data() {
		return {
			value: 0,
			query: false,
			show: true,
			auth: store.state.Auth.auth
		}
	},
	methods: {
	},
	components: {
		headerLine,
		aside
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