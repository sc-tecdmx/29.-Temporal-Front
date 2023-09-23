import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers/fetchWrapper.js';

//import { router } from '@/router';
import { useAlertStore } from '@/stores/appAlertStore.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore('appAuthStore', () => {
    const state = ref({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    })

    const  login =async (username, password) => {
        console.log("##- 1 -##");
        try {
            const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });    
      console.log("##- 2 -##");
            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        } catch (error) {
            console.log("##- 3 -##");
            const alertStore = useAlertStore();
            alertStore.error(error);                
        }
    }

    const logout = () => {
        this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
    }

    return {
        login,
        logout
    }
}) /*<*/