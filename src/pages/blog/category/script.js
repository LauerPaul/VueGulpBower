import cropImage from 'vue-image-crop-upload'
import seo from '@/components/seo'

export default {
	data() {
		return {
			valid: true,
			// -----------------------
			// Правила валидации 
			// -----------------------
			nameRules: [
				v => !!v || 'Назваение обязательно к заполнению',
				v => (v && v.length > 4) || 'Имя должно быть более 4-х символов. Введено - ' + v.length
			],
			urlRules: [
				v => !!v || 'URL обязательно к заполнению',
				v => (v && v.length > 2) || 'URL должно быть более 2-х символов. Введено - ' + v.length
			],
			step: 0,
			transliteration: false,		// Статус транслитерации
			statusText: 'off',			// Текст статуса
			loading: true,				// Статус загрузки страницы
			imageUploadWindow: false,	// Статус отображения окна кропа
			cropWidth: 600,			// Ширина изображения для кропа
			cropHeight: 300,		// Высота изображения для кропа
			// ----------------
			// URL
			// ----------------
			catDataUrl: '/blog/category/',					// url для запроса данных категории
			catSaveDataUrl: '/blog/category/save/',			// url для сохранения данных категории
		
			// -----------------
			// Данные категории
			// -----------------
			id: 0,						// Category id
			name: '',					// Название категории
			url: '',					// URL категории
			status: 0,					// Статус категории
			posts_count: 0,				// Кол-во публикаций в категории
			imgDataUrl: false,			// the datebase64 url of created image
			seoId: 0,					// id в таблице seo блога
			img: '',
			imageNew: false,
			seo: {
				// ------------
				// SEO
				// ------------
				seoTitle: '',				// Title
				seoDescription: '',			// Description
				// ------------
				// Open graph
				// ------------
				seoOgTitle: '',				// OG Title
				seoOgDescription: '',		// OG Description
				seoOgImage: '',				// OG Image
				seoOgImg: '',
				seoRobots: '',				// robots
				seoMicro: '',				// micro markup
				imageOgNew: false
			}
		}
	},
	mounted: function(){
		// ID категории
		this.id = this.$route.params.id;
		// Запрашиваем данные категории при загрузке компонента
		const getCategoryData = this.getCategory.bind(this);
		getCategoryData();
	},
	methods: {
		// Запрос данных категории с сервера
		getCategory (){
			return this.axios({
                method: 'get',
                url: this.catDataUrl + this.id,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then((response) => {
                // console.log(response.data)           
                this.loading = false;

                if(response.data.status == "ERROR") {
                	this.notify = 'Произошла ошибка при загрузке данных...'
                    this.store.commit('error', response.data.error);
                }
                else {
                	const item = response.data.category;

					this.id = item.id
					this.name = item.name
					this.url = item.url
					this.status = parseInt(item.status)
					this.posts_count = item.posts_count
					this.imgDataUrl = item.img
					this.seoId = item.seo
					this.img = this.imgDataUrl == '' ? false : this.$root.domain + this.imgDataUrl + this.$root.random();

					this.seo.seoTitle = item.seo_data.title
					this.seo.seoDescription = item.seo_data.description

					this.seo.seoOgTitle = item.seo_data.og_title
					this.seo.seoOgDescription = item.seo_data.og_description
					this.seo.seoOgImage = item.seo_data.og_image
					this.seo.seoOgImg = this.seo.seoOgImage == '' ? false : this.$root.domain + item.seo_data.og_image + this.$root.random();

					this.seo.seoRobots = item.seo_data.robots
					this.seo.seoMicro = item.seo_data.micro_markup
                }
            });
		},
		// Функция назначения изображения после кропа
		cropSuccess(imgDataUrl, field){
			this.imgDataUrl = imgDataUrl;
			this.img = imgDataUrl;
			this.imageNew = 'new';
		},
		// Save form
		submit() {
			if(this.$refs.form.validate()){
				this.loading = true;

				const data = {
					name: this.name,
					url: this.url,
					status: this.status,
					posts_count: this.posts_count,
					title: this.seo.seoTitle,
					description: this.seo.seoDescription,
					og_title: this.seo.seoOgTitle,
					og_description: this.seo.seoOgDescription,
					robots: this.seo.seoRobots,
					micro_markup: this.seo.seoMicro,
					og_image: this.seo.seoOgImage,
					img: this.imgDataUrl,
					seoId: this.seoId,
					image_new: this.imageNew,
					image_og_new: this.seo.imageOgNew,
				}

				return this.axios({
	                method: 'post',
	                url: this.catSaveDataUrl + this.id,
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.loading = false;

	                if(response.data.status == "ERROR") {
	                	this.notify = 'Произошла ошибка при загрузке данных...'
	                    this.store.commit('error', response.data.error);
	                } else {
	                    this.store.commit('success', 'Все отлично сохранилось, можешь спасть спокойно!');
	 				}
	            });

			} else {
				this.store.commit('error', {error: 'Исправьте все ошибки в форме'});
			}
		}
	},
	watch: {
		name () {
			if(this.transliteration) {
				const url = this.$root.translite(this.name);
				this.url = url;
			}
		},
		status (){
			this.statusText = this.status ? 'on' : 'off'
		}
	},
	components: {
		imageCover: cropImage,
		seo
	},
}