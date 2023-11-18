import { defineStore } from "pinia";
import router from '../router';
import axios from "axios";
import { ref, inject } from 'vue';

const baseUrl = import.meta.env.VITE_API_SEGURL;

export const useAuthStore = defineStore('authStore',()=>{
    //console.log("LOCAL ---",localStorage.getItem('user'))
    const state =  ref({
        user: JSON.parse(localStorage.getItem('user')),
        //user: null,
        returnUrl: null
    })
    const loadingUser = ref(false);
    const loginUser = async(email, password) => {
        console.log("*** Login ***")
        loadingUser.value = true;
        const urlLogin = baseUrl + "/api/seguridad/login";
             const post = {
                 email: email,
                 password: password
             }
             try {
                const usuario = ref({})
                     await axios.post(urlLogin, post).then((response) => {
                        // console.log("response",response)
                        usuario.value = localStorage.setItem('user', JSON.stringify(response.data));
                        //console.log(usuario)
                        state.value.user = JSON.parse(localStorage.getItem('user'));
                      });
                 router.push('/');
             } catch (error) {
                 console.log(error);
             }finally{
                loadingUser.value = false;
             }
    }
    const logoutUser = () => {
        localStorage.removeItem('user');
        state.value.user = localStorage.getItem('user');
        router.push('/account/login')
    }
    return { loginUser, logoutUser, state, loadingUser }
})