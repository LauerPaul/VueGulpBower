import store from '../../../system/store.js'

export default {
	data: () => ({
		catsListUrl: '/blog/categories/',
		catRemoveUrl: '/blog/categories/remove/',
		loading: true,

		searchlineShow: false,
		pagination: {sortBy: 'id'},

		dialogRemoveItem: false,
		notifications: true,
        sound: true,
        widgets: true,
        selectItem: '',
		selected: [],
		search: '',
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
		categories: []
	}),
	mounted: function () {
		const list = this.getCategories.bind(this);
		list();
	},
	methods: {
		getCategories (){
			return this.axios({
                method: 'get',
                url: this.catsListUrl,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then(response => {
                // console.log(response.data)                
                this.loading = false;
                this.categories = response.data.categories;

                if(response.data.status == "ERROR") {
                	const notify = 'Произошла ошибка при загрузке данных...'
                    store.commit('error', notify);
                }
            });
		},

		toggleSearch (){
			if(this.searchlineShow){
				this.search = '';
			}

			this.searchlineShow = !this.searchlineShow;
		},
		changeSort (column) {
			if (this.pagination.sortBy === column) {
				this.pagination.descending = !this.pagination.descending
			} else {
				this.pagination.sortBy = column
				this.pagination.descending = false
			}
		},
		removeAlert (){
			const audio = new Audio();
			audio.preload = 'auto';
			audio.src = '/sound/system/Sound_11990.wav';
			audio.play();

			this.dialogRemoveItem = true;
		},
		removeCategory (){
			this.dialogRemoveItem = false;

			return this.axios({
                method: 'get',
                url: this.catRemoveUrl + this.selectItem.id,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then(response => {
                console.log(response.data)            
                this.loading = false;

                const elem = document.getElementById('CatBlog_' + this.selectItem.id);
                elem.parentNode.removeChild(elem);

                if(response.data.status == "ERROR") {
                	const notify = 'Произошла ошибка при загрузке данных...'
                    store.commit('error', notify);
                }
            });
		}
	}
}