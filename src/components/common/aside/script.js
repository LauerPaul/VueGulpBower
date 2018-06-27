import menu from "./listMenu.js"

export default {
	props: ['aside_min'],
	data () {
		return {
			drawer: true,
			items: [],
			right: null,
			user: this.$root.store.state.Auth.user,
			status: '',
			isAdmin: false,
			isSeoDev: false,
			isModerator: false,
			isManager: false,
		}
	},
	mounted: function (){
		this.stasusSet();
	},
	methods: {
		stasusSet () {
			// ADMIN
			if(this.$root.store.state.Auth.isAdmin){
				this.status = 'Admin'
				this.isAdmin = true
				this.items = menu.admin
			}
			// Seo developer
			else if(this.$root.store.state.Auth.isSeoDev){
				this.status = 'SEO специалист'
				this.isSeoDev = true
				this.items = menu.seo
			}
			// Moderator
			else if(this.$root.store.state.Auth.isModerator){
				this.status = 'Moderator'
				this.isModerator = true
				this.items = menu.moderator
			}
			// Manager
			else if(this.$root.store.state.Auth.isManager){
				this.status = 'Manager'
				this.isManager = true
				this.items = menu.manager
			}
		}
	}
}