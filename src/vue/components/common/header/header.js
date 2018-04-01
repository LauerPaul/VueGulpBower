let headerLinks = [
	{
		'title': 'Girls online',
		'link': '{}'
	}
]

export default {
	props: ['aside_min'],
	data () {
		return {
			logo: require('../../../../assets/img/common/logo.png'),
			minAsideStatus: this.aside_min, // Статус меню
		}
	},
	methods: {
		toggleAside(event) {
			this.minAsideStatus = !this.minAsideStatus;
			this.$emit('toggleMenu', this.minAsideStatus);
		}
	}
}