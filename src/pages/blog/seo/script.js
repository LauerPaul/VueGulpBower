import seo from '../../../components/seo/seo.vue'
import store from '../../../system/store.js'

export default {
	data() {
		return {
			urlGetSeo: '/blog/seo', 	// ссылка для загрузки seo данных категории
			valid: true,
			status: 1,					// Статус категории
			loading: true,
			seoId: 0,
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
		this.getSeo();
	},
	methods: {
		// Get seo data
		getSeo (){
			return this.axios({
                method: 'get',
                url: this.urlGetSeo,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: '',
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
                	const notify = 'Произошла ошибка при загрузке данных...'
                    store.commit('error', notify);
                }
                else {
                	this.seoId = response.data.data.id
					this.seo.seoTitle = response.data.data.title
					this.seo.seoDescription = response.data.data.description
					this.seo.seoOgTitle = response.data.data.og_title
					this.seo.seoOgDescription = response.data.data.og_description
					this.seo.seoOgImage = response.data.data.og_image
					this.seo.seoRobots = response.data.data.robots
					this.seo.seoMicro = response.data.data.micro_markup
					this.seo.seoOgImg = this.seo.seoOgImage == '' ? false : this.$root.domain + this.seo.seoOgImage + '?' + Math.floor((Math.random() * ((777 + 1) - 55)) + 99999);
                }
            });
		},
		// Save form
		submit() {
			if(this.$refs.form.validate()){
				this.loading = true;

				const data = {
					id: this.seoId,
					title: this.seo.seoTitle,
					description: this.seo.seoDescription,
					
					og_title: this.seo.seoOgTitle,
					og_description: this.seo.seoOgDescription,
					og_image: this.seo.seoOgImage,
					image_og_new: this.seo.imageOgNew,
					robots: this.seo.seoRobots,
					micro_markup: this.seo.seoMicro,
				}

				return this.axios({
	                method: 'post',
	                url: this.urlGetSeo + '/save',
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.loading = false;

	                if(response.data.status == "ERROR") {
	                	this.notify = 'Произошла ошибка при загрузке данных...'
	                    store.commit('error', response.data.error);
	                } else {
	                    store.commit('success', 'SEO в норме!');
	 				}
	            });

			} else {
				store.commit('error', {error: 'Исправьте все ошибки в форме'});
			}
		}
	},
	watch: {
	},
	components: {
		seo
	},
}