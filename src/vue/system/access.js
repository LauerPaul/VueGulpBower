import Vue from 'vue'
import Vuex from 'vuex'
import store from './store.js'
import router from './router.js'

Vue.use(Vuex)

const Access = {
    state: {
    	access: false,
        action: true
    },
    mutations: {
    	/* 
    		Проверка прав доступа
    		@ 1 - Admin
    		@ 2 - Moderator
    		@ 3 - Manager
    		@ 4 - Seo
    	*/ 
        getAccess: (state, data) => {

            data.forEach((status) => {
                if(status == 1 && store.state.Auth.isAdmin) state.access = true
                if(status == 2 && store.state.Auth.isModerator) state.access = true
                if(status == 3 && store.state.Auth.isManager) state.access = true
                if(status == 4 && store.state.Auth.isSeoDev) state.access = true
            });

            if(!state.access) {
                router.push({name: 'home'});
                store.commit('error', {error: 'Недостаточно прав'});
            } else {
                state.access = false;
            }
        },
        getAccessAction: (state, data) => {

        	data.forEach((status) => {
        		if(status == 1 && store.state.Auth.isAdmin) state.access = true
        		if(status == 2 && store.state.Auth.isModerator) state.access = true
        		if(status == 3 && store.state.Auth.isManager) state.access = true
        		if(status == 4 && store.state.Auth.isSeoDev) state.access = true
        	});

        	if(!state.access) {
                store.commit('error', {error: 'Недостаточно прав'});
                state.action = false;
            } else {
                state.action = true;
        		state.access = false;
        	}
        },
    }
}

export default Access