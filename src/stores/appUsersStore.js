import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers/fetchWrapper.js';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useUsersStore = defineStore('appUsersStore', () => {
    const state = () => ({
        users: {},
        user: {}    
    })

    const register =  async ( user ) => {
        await fetchWrapper.post(`${baseUrl}/register`, user);
    }

    const getAll = async () => {
        this.users = { loading: true };
        try {
            this.users = await fetchWrapper.get(baseUrl);    
        } catch (error) {
            this.users = { error };
        }
    }

    const getById = async (id ) => {
        this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.user = { error };
            }
    }

    const update = async (id, params) => {
        await fetchWrapper.put(`${baseUrl}/${id}`, params);

        // update stored user if the logged in user updated their own record
        const authStore = useAuthStore();
        if (id === authStore.user.id) {
            // update local storage
            const user = { ...authStore.user, ...params };
            localStorage.setItem('user', JSON.stringify(user));

            // update auth user in pinia state
            authStore.user = user;
        }
    }

    const deletee = async (id) => {
        this.users.find(x => x.id === id).isDeleting = true;

        await fetchWrapper.delete(`${baseUrl}/${id}`);

        // remove user from list after deleted
        this.users = this.users.filter(x => x.id !== id);

        // auto logout if the logged in user deleted their own record
        const authStore = useAuthStore();
        if (id === authStore.user.id) {
            authStore.logout();
        }
    }

    return {
        register,
        getAll,
        getById,
        update,
        deletee
    }
}) 