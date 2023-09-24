import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers/fetchWrapper.js';

import  router  from '@/router';
import { useAlertStore } from '@/stores/appAlertStore.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore('appAuthStore', () => {
    const state = ref({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    })

    const  login = async (username, password) => {
        console.log("##-appAuthStore.js 1 -##");
        try {
            const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });    
      console.log("##-appAuthStore.js 2 user:-##" );
      console.log( JSON.stringify( user))
      console.log("##-appAuthStore.js 3  state.returnUrl:-##" );
      console.log( JSON.stringify( state.returnUrl))
            // update pinia state
            state.value.user = user;
            console.log("##-appAuthStore.js 4   state.value.user:-##" );
            console.log( JSON.stringify( state.value.user))
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push( '/tablero');
        } catch (error) {
            console.log("##-appAuthStore.js 5 -##" + error);
            const alertStore = useAlertStore();
            alertStore.error(error);                
        }
    }

    const logout = () => {
        state.value.user = null;
            localStorage.removeItem('user');
            router.push('/login');
    }

    return {
        state,
        login,
        logout
    }
}) /*<*/