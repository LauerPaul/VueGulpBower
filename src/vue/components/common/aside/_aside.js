const menuItems = [
	{ 
		title: 'Статистика',
		icon: 'mdi-view-dashboard',
		color: "grey darken-2",
		link: 'home',
		parent: false,
	},
	{
		title: 'Блог',
		icon: 'mdi-blogger',
		color: "blue darken-2",
		link: 'blog',
		parent: false,
	},
	{
		title: 'Пользователи',
		icon: 'mdi-account-multiple',
		color: "grey darken-2",
		link: 'users',
		parent: false,
	},
	{
		title: 'Настройки',
		icon: 'mdi-settings',
		color: "grey darken-2",
		parent: true,
		children: [
			{
				title: 'Основные',
				icon: 'mdi-settings-outline',
				color: "grey",
				link: 'settingsPrimary'
			},
			{
				title: 'Почта',
				icon: 'mdi-mail-ru',
				color: "grey",
				link: 'settingsMail'
			}
		]
	}
]

export default {
	props: ['aside_min'],
	data () {
		return {
			drawer: true,
			items: menuItems,
			right: null
		}
	}
}