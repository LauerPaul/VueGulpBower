export default {
	data() {
		return {
			// ------------
			// URL
			// ------------
			usersListUrl: '/users',
			usersStatisticUrl: '/users/statistic',
			// ------------
			valid: true,
			titleTable: (this.$root.store.state.Auth.isAdmin ? 'Пользователи' : 'Клиенты'),
			// ------------
			loading: true,				// Статус загрузки таблицы
			searchlineShow: false,		// Стутс отображения поиска
			pagination: {sortBy: 'id'},	// Параметры пагинации
			dialogRemoveItem: false,	// Статус отображения диалогового окна при уалении
			sound: true,				// Статус звуковых оповещений
	        selectUser: {id: 0, 		// Зарезервированная переменная - выбранный элемент
        					user: {is_enabled: 0}
        				},
	        quickView: false,			// Статус отображения быстрого просмотра
			selected: [],				// Выделенные элементы таблицы
			search: '',			// Зарезервированная переменная - значения поиска
			notify: '',			// Зарезервированная переменная - текст оповещения
			addNew: false,		// Статус попап окна новой категории
			newName: '',		// Зарезервированная переменная - название новой категори
			sendNewName: false,	// Статус связи с сервером при создании новой категории
			headers: [],		// Параметры таблицы
			users: [],			// Зарезервированная переменная - категории
			img: '',
			statisticWindow: false,	// Окно статистики
			statistics: {			// Массив статистики
				all: 0,
				admin: 0,
				manager: 0,
				seo: 0,
				moderator: 0,
				clients: 0,
				enabled: 0,
				disabled: 0
			},
		}
	},
	mounted: function(){
		// Назначаем headers для таблицы, в зависимости от прав пользователя
		if(this.$root.store.state.Auth.isAdmin){
			this.headers = [
				{ text: 'ID', value: 'user_id' },
				{ text: ' ', value: 'is_enabled', sortable: false  },
				{
					text: 'Имя',
					align: 'left',
					value: 'last_name'
				},
				{ text: 'Status', value: 'is_enabled', sortable: false  },
				{ text: 'Телефон', value: 'phone', align: 'left', sortable: false },
				{ text: '', value: '', sortable: false }
			]
		}
		else{
			this.headers = [
				{ text: 'ID', value: 'user_id' },
				{ text: ' ', value: 'is_enabled', sortable: false  },
				{
					text: 'Имя',
					align: 'left',
					value: 'last_name'
				},
				{ text: 'Телефон', value: 'phone', align: 'left', sortable: false },
				{ text: '', value: '', sortable: false }
			]
		}
		/**
		* Определяем правила доступа
		* @param 1 - Admin
		* @param 2 - Moderator
		* @param 3 - Manager
		* @param 4 - SEO
		**/
		this.$root.store.commit('getAccess', [1,2,3]);
		this.getUsersList();
	},
	methods: {
		// Запрос списка пользователей
		getUsersList() {
			return this.axios({
                method: 'get',
                url: this.usersListUrl,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then((response) => {
                if(response.data.status == "ERROR") {
                	if(response.data.action == 'logout') this.$root.store.commit('logout');
                    this.$root.store.commit('error', response.data);
                }
                else {
	                this.users = response.data.users;
					this.getStatistics();
                }
            });
		},

		// Сбор статистики 
		getStatistics(){
			this.$root.store.commit('getAccessAction', [1, 3]);
			return this.axios({
                method: 'get',
                url: this.usersStatisticUrl,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
                	if(response.data.action == 'logout') this.$root.store.commit('logout');
                    this.$root.store.commit('error', response.data);
                }
                else {
	                this.statistics.admin = response.data.statistic.admin
					this.statistics.moderator = response.data.statistic.moderator
					this.statistics.manager = response.data.statistic.manager
					this.statistics.seo = response.data.statistic.seo
					this.statistics.all = response.data.statistic.all
					this.statistics.clients = response.data.statistic.clients
					this.statistics.enabled = response.data.statistic.enabled
					this.statistics.disabled = response.data.statistic.disabled
					this.statisticWindow = true;
                }
            });
		},

		// Поиск по таблице - тумблер
		toggleSearch (){
			if(this.searchlineShow){
				this.search = '';
			}
			this.searchlineShow = !this.searchlineShow;
		},

		// Выбор пользователя
		setSelectUser (item){
			this.selectUser = item;
			console.log(this.selectUser);
			this.img = this.selectUser.photo + this.$root.random();
			if(this.selectUser.user.is_enabled == '0' || this.selectUser.user.is_enabled == 0) this.selectUser.user.is_enabled = false
			else this.selectUser.user.is_enabled = true
		}
	},
	watch: {
	},
	components: {
	},
}