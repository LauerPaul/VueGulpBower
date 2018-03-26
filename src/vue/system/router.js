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