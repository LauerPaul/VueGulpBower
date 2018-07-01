/**
* @vuedoc
* @module pages/blog/categories
* @see @/pages/blog/categories
*
* @version 1.0
* @desc Страница списка категории блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import addNewComponent from '@/components/blog/categories/new'
import dialogRemove from '@/components/blog/dialog-remove'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} catsListUrl - url для запроса списка категорий
	* 	@property {string} catRemoveUrl - url для удаления категории
	* 	@property {string} catStatusToggle - url для переключения статуса отображения категории на сайте
	* 	@property {string} catAddNewURL - url для добавления новой категории
	* 	@property {string} statutsUrlPostprefix - статус видимости - приставка к url (зарезервированная переменная)
	*
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*	@property {boolean} searchlineShow - Стутс отображения поиска (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {boolean} addNew_window - Статус видимости попап окна новой категории
	*
	*	@property {object} dialogRemove - Параметры для диалогового окна при попытке удалить категорию (компонент [dialog-remove]{@link module:components/blog/dialog-remove})
	*		@property {boolean} dialogRemove.status - Статус отображения диалогового окна при попытке уаления категории из списка
	*		@property {boolean} dialogRemove.error - Ошибка (возникает в случае попытки удалить категорию, к которой прикреплены публикации)
	*		@property {string} dialogRemove.url - Ссылка запроса на удаление
	*		@property {string} dialogRemove.title - Заголовок диалогового окна
	*		@property {string} dialogRemove.text - Текст диалогового окна
	*
	*	@property {boolean} sound - Статус звуковых оповещений
	*	@property {boolean} quickView - Статус отображения виджета быстрого просмотра
	*	@property {boolean} statisticWindow - Статус отображения статистики
	*
	*	@property {object} pagination - Параметры пагинации таблицы (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} headers - Параметры таблицы ([подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} selected - Выделенные элементы таблицы
	*	@property {array} categories - Список категорий (Зарезервированная переменная)
	*
	*	@property {string} search - Значения поиска (Зарезервированная переменная)
	*	@property {string} notify - Текст оповещения (Зарезервированная переменная)
	*	@property {string} img - (Зарезервированная переменная)
	*
	*	@property {object} selectItem - Данные выбранной категории (зарезервированная переменная)
	*		@property {object} selectItem.id - ID категории (зарезервированная переменная)
	*
	*	@property {object} statistics - Статистика по категориям блога
	*		@property {int} statistics.full - Всего категорий (Зарезервированная переменная)
	*		@property {int} statistics.clear - Пустых категорий (Зарезервированная переменная)
	*		@property {int} statistics.on - Активных категорий (Зарезервированная переменная)
	*		@property {int} statistics.off - Неактивных категорий (Зарезервированная переменная)
	*
	*/
	catsListUrl: '/blog/categories/',
	catRemoveUrl: '/blog/categories/remove/',
	catStatusToggle: '/blog/categories/status/',
	catAddNewURL: '/blog/category/new',
	statutsUrlPostprefix: '',

	access: {
		edit: true,
		remove: true,
		add: true,
		quickView: true
	},
	
	loading: true,
	searchlineShow: false,
	addNew_window: false,
	dialogRemove: {
		status: false,
		error: false,
		url: '',
		title: '',
		text: ''
	},
	sound: true,
    quickView: false,
	statisticWindow: false,

	pagination: {sortBy: 'id'},
	headers: [
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
	selected: [],
	categories: [],
	img: '',
	
	search: '',
	notify: '',
	
    selectItem: {id: 0},
	statistics: {
		full: 0,
		clear: 0,
		on: 0,
		off: 0
	},
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос списка категорий блога (AJAX)
	*	@method getUsersList
	**/
	getCategories (){
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');
		
		return this.axios({
            method: 'get',
            url: this.catsListUrl,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            // console.log(response.data)                
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Blog categories\' (@/pages/blog/categories) - AJAX error');

            	this.$notify.error('Произошла ошибка при загрузке данных...')
            	console.log(response.data.error);
            }else {
				this.$log.debug('page \'Blog categories\' (@/pages/blog/categories) - AJAX success');

                this.categories = response.data.categories;
                this.getStatistics();
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сбор статистики категорий блога
	*	@method getStatistics
	**/
	getStatistics(){
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');

		const t = this;
		this.categories.forEach(function(item, i, arr) {
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

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение статуса видимости поиска по таблице
	*	@method toggleSearch
	**/
	toggleSearch (){
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');

		if(this.searchlineShow) this.search = ''
		this.searchlineShow = !this.searchlineShow;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сортировка таблицы
	*	@method changeSort
	**/
	changeSort (column) {
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');

		if (this.pagination.sortBy === column) {
			this.pagination.descending = !this.pagination.descending
		} else {
			this.pagination.sortBy = column
			this.pagination.descending = false
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Всплывающее окно при попытке удаления категории
	*	@method removeAlert
	**/
	removeAlert (){
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');
		this.dialogRemove.url = this.catRemoveUrl + this.selectItem.id

		if(this.selectItem.posts_count == 0){
			this.dialogRemove.error = false
			this.dialogRemove.title = 'ПОДТВЕРДИТЕ ДЕЙСТВИЕ'
			this.dialogRemove.text = 'Вы действительно хотите удалить категорию блога с названием<br><strong>"'+ this.selectItem.name +'"</strong> - <strong>ID '+ this.selectItem.id +'</strong>?'
		}else {
			this.dialogRemove.error = true
			this.dialogRemove.title = 'УДАЛЕНИЕ НЕВОЗМОЖНО'
			this.dialogRemove.text = 'Вы пытаетесь удалить категорию блога<br><strong>"'+ this.selectItem.name +'"</strong> - <strong> ID '+ this.selectItem.id +'</strong>.<br>В данной категории'+ this.selectItem.posts_count +'публикаций.'
		}

		this.dialogRemove.status = true;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выполняется при успешном удалении элемента
	*	@method removeSuccess
	**/
	removeSuccess(error){
		this.dialogRemove.status = false;
		if(!error){
			const elem = document.getElementById('CatBlog_' + this.selectItem.id);
		    elem.parentNode.removeChild(elem);
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выбор категории
	*	@param item {object} - Данные выбранной категории
	*	@method setSelectItem
	**/
	setSelectItem (item){
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');

		this.selectItem = item;
		this.img = this.$root.domain + this.selectItem.img;
		if(this.selectItem.status == '0' || this.selectItem.status == 0) this.selectItem.status = false
		else this.selectItem.status = true
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос обновления данных категории (AJAX)
	*	@method updateStatusCategory
	**/
	updateStatusCategory (){
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - method init');

		if(this.selectItem.status){
			this.statutsUrlPostprefix = 0;
        	this.notify = 'Категория не отображается на сайте =('
		}else {
			this.statutsUrlPostprefix = 1;
        	this.notify = 'Все ок! Категория отображается на сайте =)'
		}

		return this.axios({
            method: 'get',
            url: this.catStatusToggle + this.statutsUrlPostprefix + '/' + this.selectItem.id,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            if(response.data.status == "ERROR") {
				this.$log.error('page \'Blog categories\' (@/pages/blog/categories) - AJAX error');

                this.$store.commit('error', response.data);
            }
            else {
				this.$log.debug('page \'Blog categories\' (@/pages/blog/categories) - AJAX success');

                this.$store.commit('success', this.notify);
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
}

/** Export component */
export default {
	// Set data
	data: function() { return data },

	// Methods
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Блог категории'
	},

	/**
	* Данная страница использует компоненты:
	*	
	*	> [Blog add-new]{@link module:components/blog/categories/new}
	*	> [Blog dialog-remove]{@link module:components/blog/dialog-remove}
	*/
	components: {
		'add-new' : addNewComponent,
		'dialog-remove' : dialogRemove
	},

	/**
	* @desc ▶ Hook reporting
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрашиваем список категорий при загрузке компонента -> getCategories()
	* @event module:pages/blog/categories~Page <strong>Blog categories</strong> mounted
	*/
	mounted: function () {
		this.$log.info('page \'Blog categories\' (@/pages/blog/categories) - mounted hook init');
		
		// Исбавляемся от кеша
		this.addNew_window = false
		// Запрашиваем список категорий при загрузке компонента
		const list = this.getCategories.bind(this);
		list();

		this.access.edit  = parseInt(this.$store.state.Auth.accessTable.blogCategory.access)
		this.access.remove = this.$access('remove', true)
		this.access.add = this.$access('add', true)
	},
}