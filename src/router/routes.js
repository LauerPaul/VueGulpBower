import Vue from 'vue'
import Meta from 'vue-meta'
import store from '@/store'

Vue.use(Meta)
// ------------------------------------------------

import auth from '@/pages/auth'
import notFound from '@/pages/404'
import index from '@/pages/index'

import users from '@/pages/users'

import blog from '@/pages/blog'
import blogMenu from '@/pages/blog/menu'
import blogCategories from '@/pages/blog/categories'
import blogArticles from '@/pages/blog/articles'
import blogSeo from '@/pages/blog/seo'

import blogCategory from '@/pages/blog/category'

import settings from '@/pages/settings'
import settingsPrimary from '@/pages/settings'
import settingsMail from '@/pages/settings'

const routes = [
	{	
		/*Index page*/
		path: "/",
		name: 'home',
		component: index,
        meta: {
            isAuth: true,
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
            isAuth: true,
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
]

export default routes