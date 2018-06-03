export default {
	admin: [
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
				parent: true,
				children: [
					{
						title: 'Категории',
						icon: 'mdi-archive',
						color: "grey",
						link: 'blogCategories'
					},
					{
						title: 'Публикации',
						icon: 'mdi-note-text',
						color: "grey",
						link: 'blogArticles'
					},
					{
						title: 'SEO',
						icon: 'mdi-search-web',
						color: "grey",
						link: 'blogSeo'
					}
				]
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
	],
	moderator: [
			{
				title: 'Блог',
				icon: 'mdi-blogger',
				color: "blue darken-2",
				link: 'blog',
				parent: true,
				children: [
					{
						title: 'Публикации',
						icon: 'mdi-note-text',
						color: "grey",
						link: 'blogArticles'
					}
				]
			},
			{
				title: 'Пользователи',
				icon: 'mdi-account-multiple',
				color: "grey darken-2",
				link: 'users',
				parent: false,
			}
	],
	seo: [
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
				parent: true,
				children: [
					{
						title: 'Категории',
						icon: 'mdi-archive',
						color: "grey",
						link: 'blogCategories'
					},
					{
						title: 'Публикации',
						icon: 'mdi-note-text',
						color: "grey",
						link: 'blogArticles'
					},
					{
						title: 'SEO',
						icon: 'mdi-search-web',
						color: "grey",
						link: 'blogSeo'
					}
				]
			}
	],
	manager: [
			{
				title: 'Клиенты',
				icon: 'mdi-account-multiple',
				color: "grey darken-2",
				link: 'users',
				parent: false,
			}
		]
}