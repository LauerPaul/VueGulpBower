export default {
	data: () => ({
		// ------------
		// URL
		// ------------
		postsListUrl: '/blog/posts/',			// url для запроса списка категорий
		postRemoveUrl: '/blog/posts/remove/',	// url для удаления категории
		postStatusToggle: '/blog/posts/status/',// url для переключения статуса отображения категории на сайте
		statutsUrlPostprefix: '',
		postAddNewURL: '/blog/category/new',	// url для добавления новой категории
		// ------------
		valid: true,
		// -----------------------
		// Правила валидации 
		// -----------------------
		nameRules: [
			v => !!v || 'Назваение обязательно к заполнению',
			v => (v && v.length > 4) || 'Имя должно быть более 4-х символов. Введено - ' + v.length
		],
		loading: true,				// Статус загрузки таблицы
		searchlineShow: false,		// Стутс отображения поиска
		pagination: {sortBy: 'id'},	// Параметры пагинации
		dialogRemoveItem: false,	// Статус отображения диалогового окна при уалении
		sound: true,				// Статус звуковых оповещений
        selectItem: {id: 0},		// Зарезервированная переменная - выбранный элемент
        quickView: false,			// Статус отображения быстрого просмотра
		selected: [],				// Выделенные элементы таблицы
		search: '',			// Зарезервированная переменная - значения поиска
		notify: '',			// Зарезервированная переменная - текст оповещения
		addNew: false,		// Статус попап окна новой категории
		newName: '',		// Зарезервированная переменная - название новой категори
		sendNewName: false,	// Статус связи с сервером при создании новой категории
		headers: [			// Параметры таблицы
			{ text: 'ID', value: 'id' },
			{
				text: 'Название',
				align: 'left',
				value: 'name'
			},
			{ text: 'Кол-во пуб.', align: 'center', value: 'posts_count' },
			{ text: 'Статус', value: 'status', align: 'left' },
			{ text: '', value: '', sortable: false }
		],
		statisticWindow: false,	// Окно статистики
		statistics: {			// Массив статистики
			full: 0,
			clear: 0,
			on: 0,
			off: 0
		},
		posts: [],			// Зарезервированная переменная - категории
		img: ''
	}),
	mounted: function () {
		// Запрашиваем список категорий при загрузке компонента
		const list = this.getPosts.bind(this);
		list();
	},
	methods: {
		// Запрос списка категорий с сервера
		getPosts (){
			return this.axios({
                method: 'get',
                url: this.postsListUrl,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then((response) => {
                // console.log(response.data)                
                this.loading = false;

                if(response.data.status == "ERROR") {
                	this.notify = 'Произошла ошибка при загрузке данных...'
                    this.store.commit('error', this.notify);
                }
                else {
	                this.posts = response.data.posts;
	                this.getStatistics();
                }
            });
		},
		// Сбор статистики 
		getStatistics(){
			const t = this;
			this.posts.forEach(function(item, i, arr) {
				if(parseInt(item.status) == 1) {
					t.statistics.on += 1;
				} else {
					t.statistics.off += 1;
				}

				if(parseInt(item.posts_count) > 0) {
					t.statistics.full += 1;
				} else {
					t.statistics.clear += 1;
				}
			});

			this.statisticWindow = true;
		},
		// Поиск по таблице - тумблер
		toggleSearch (){
			if(this.searchlineShow){
				this.search = '';
			}

			this.searchlineShow = !this.searchlineShow;
		},
		// Сортировка таблицы
		changeSort (column) {
			if (this.pagination.sortBy === column) {
				this.pagination.descending = !this.pagination.descending
			} else {
				this.pagination.sortBy = column
				this.pagination.descending = false
			}
		},
		// Всплывающее окно при попытке удаления категории
		removeAlert (){
			if(this.sound) {
				const audio = new Audio();
				audio.preload = 'auto';
				audio.src = '/sound/system/Sound_11990.wav';
				audio.play();
			}

			this.dialogRemoveItem = true;
		},
		// Устанавливаем в переменную значения выбранной категории
		setSelectItem (item){
			this.selectItem = item;
			this.img = this.$root.domain + this.selectItem.img;
			if(this.selectItem.status == '0' || this.selectItem.status == 0) this.selectItem.status = false
			else this.selectItem.status = true
		},
		// Удаление категории
		removeCategory (){
			this.dialogRemoveItem = false;

			return this.axios({
                method: 'post',
                url: this.postRemoveUrl + this.selectItem.id,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify({seo: this.selectItem.seo}),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
                	this.notify = { error: 'Произошла ошибка при загрузке данных...'}
                    this.store.commit('error', this.notify);
                }
                else {
	                const elem = document.getElementById('CatBlog_' + this.selectItem.id);
	                elem.parentNode.removeChild(elem);
                    this.store.commit('success', 'Категория успешно удалена.');
                }
            });
		},
		// Обновление статуса кат-рии
		updateStatusCategory (){
			if(this.selectItem.status){
				this.statutsUrlPostprefix = 0;
            	this.notify = 'Категория не отображается на сайте =('
			}else {
				this.statutsUrlPostprefix = 1;
            	this.notify = 'Все ок! Категория отображается на сайте =)'
			}

			return this.axios({
                method: 'get',
                url: this.postStatusToggle + this.statutsUrlPostprefix + '/' + this.selectItem.id,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then((response) => {
                if(response.data.status == "ERROR") {
                    this.store.commit('error', response.data);
                }
                else {
                    this.store.commit('success', this.notify);
                    this.selectItem.status = !this.selectItem.status;
                    if(!this.selectItem.status) {
	                    this.statistics.on -= 1;
						this.statistics.off += 1;
                    } else{
	                    this.statistics.on += 1;
						this.statistics.off -= 1;
                    }
                }
            });
		},
		// Add new category reset
		addNewReset (e){
			e.preventDefault();
			this.addNew = false;
			this.newName = '';
		},
		// Add new submit
		submitAddNew() {
			if(this.$refs.form.validate()){
				this.sendNewName = true;
				const url = this.$root.translite(this.newName)
				const data = {
					name: this.newName,
					url: url
				}

				return this.axios({
	                method: 'post',
	                url: this.postAddNewURL,
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.sendNewName = false;
	                if(response.data.status == "ERROR") {
	                    this.store.commit('error', response.data);
	                } else {
	                    this.store.commit('success', 'Новая категория добавлена успешно!');
	                    this.$router.push({name: 'blogCategory', params: {id: response.data.id}});
	 				}
	            });
			}
		}
	}
}