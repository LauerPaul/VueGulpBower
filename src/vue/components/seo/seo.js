import cropImage from 'vue-image-crop-upload';

export default {
	props: ['props', 'required'],
	data: () => ({
		// -----------------------
		// Правила валидации 
		// -----------------------
		titleRules: [
			v => !!v || 'Meta tag title - поле обязательно к заполнению',
			v => (v && v.length > 60) || 'Meta tag title должен быть более 60 символов. Введено - ' + v.length
		],
		descriptionRules: [
			v => !!v || 'Meta tag title - поле обязательно к заполнению',
			v => (v && v.length > 120) || 'Meta tag title должен быть более 120 символов. Введено - ' + v.length
		],
		imageUploadWindowSeo: false,	// Статус отображения окна кропа OG image
		cropWidthSeo: 1200,				// Ширина изображения для кропа OG image
		cropHeightSeo: 1200,			// Высота изображения для кропа OG image
		// Параметры для robots
		robots: [
			{text: 'index,follow'},
			{text: 'noindex,follow'},
			{text: 'index,nofollow'},
			{text: 'noindex,nofollow'}
		],
	}),
	methods: {
		// Функция назначения изображения после кропа
		cropSuccess(imgDataUrl, field){
			this.props.seoOgImage = imgDataUrl;
			this.props.seoOgImg = imgDataUrl;
			this.props.imageOgNew = 'new';
		},
	},
	watch: {
    },
    components: {
		imageCover: cropImage,
    }
}

// seo: {
// 	// ------------
// 	// SEO
// 	// ------------
// 	seoTitle: '',				// Title
// 	seoDescription: '',			// Description
// 	// ------------
// 	// Open graph
// 	// ------------
// 	seoOgTitle: '',				// OG Title
// 	seoOgDescription: '',		// OG Description
// 	seoOgImage: '',				// OG Image

// 	seoRobots: '',				// robots
// 	seoMicro: '',				// micro markup
// }