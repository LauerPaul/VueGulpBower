import Vue from 'vue';
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import store from './store.js'

Vue.use(VueRouter)
Vue.use(Meta)

// --------------------------------------------------
import auth from '../components/auth/auth.vue'
import index from '../pages/index/index.vue'
import notFound from '../pages/404/404.vue'

import users from '../pages/users/users.vue'

import blog from '../pages/blog/blog.vue'
import blogMenu from '../pages/blog/menu/blogMenu.vue'
import blogCategories from '../pages/blog/categories/blogCategories.vue'
import blogArticles from '../pages/blog/articles/blogArticles.vue'
import blogSeo from '../pages/blog/seo/blogSeo.vue'

import blogCategory from '../pages/blog/category/edit.vue'

import settings from '../pages/settings/settings.vue'
import settingsPrimary from '../pages/settings/settings_primary.vue'
import settingsMail from '../pages/settings/settings_mail.vue'
// __________________________________________________

const router = new VueRouter({
    mode: 'history',
	routes: [
		{	
			/*Index page*/
			path: "/",
			name: 'home',
			component: index,
	        meta: {
	            isAuth: true
	        },
		},
		{	
			/*Auth page*/
			path: "/login",
			name: 'login',
			component: auth,
	        meta: {
	            isAuth: false
	        },
		},
		{	
			/*Logout page*/
			path: "/logout",
			name: 'logout',
			beforeEnter (to, from, next) {
				store.commit('logout');
			},
	        meta: {
	            isAuth: true
	        },
		},
		{	
			/*Users page*/
			path: "/users",
			name: 'users',
			component: users,
	        meta: {
	            isAuth: true
	        },
		},
		{	
			/*Blog page*/
			path: "/blog",
			name: 'blog',
			component: blog,
			redirect: '/blog/menu',
	        meta: {
	            isAuth: true
	        },
	        children: [
	        	{
					path: 'menu',
					name: 'blogMenu',
					component: blogMenu
				},
	        	{
					path: 'categories',
					name: 'blogCategories',
					component: blogCategories
				},
	        	{
					path: 'category',
					component: blogCategory,
					redirect: '/blog/categories',
			        children: [
			        	{
							path: ':id',
							name: 'blogCategory',
							component: blogCategory
						}
					]
				},
	        	{
					path: 'articles',
					name: 'blogArticles',
					component: blogArticles
				},
	        	{
					path: 'seo',
					name: 'blogSeo',
					component: blogSeo
				},
	        ]
		},
		{
			/*Settings*/
			path: "/settings",
			name: 'settings',
			component: settings,
			meta: {
	            isAuth: true
	        },
	        children: [
	        	{
					path: 'primary',
					name: 'settingsPrimary',
					component: settingsPrimary
				},
	        	{
					path: 'mail',
					name: 'settingsMail',
					component: settingsMail
				},
	        ]
		},
		/* Web-серверные ошибки и сообщения */
		{
			/* 404 - Page not found */
			path: '/404',
			name: 'notfound',
			component: notFound
		}, {
			path: '*',
			redirect: '/404'
		}
	],
	linkActiveClass: 'activeLink',
    linkExactActiveClass: 'globalActiveLink'
})

router.beforeEach(
    (to, from, next) => {
        if(to.matched.some(record => record.meta.isAuth)){
            if(!store.state.Auth.auth){
                next({
                    path: '/login'
                })
            } else next()
        }else if(to.matched.some(record => record.meta.isGuest)){
            if(!store.state.Auth.auth){
                next({
                    path: '/login'
                })
            }else{
                next()
            }
        } else {
        	if(store.state.Auth.auth && to.path === '/login'){
        		next({
                    path: '/'
                })
        	}
        	next()
        }
    }
)

export default router