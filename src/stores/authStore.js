import { defineStore } from "pinia";
import router from '../router';
import axios from "axios";
import { ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_SEGURL;

export const useAuthStore = defineStore('authStore',()=>{
    const state =  ref({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    })
    const loadingUser = ref(false);
    const loginUser = async(email, password) => {
        loadingUser.value = true;
        const urlLogin = baseUrl + "/api/seguridad/login";
             const post = {
                 email: email,
                 password: password
             }
             try {
                const usuario = ref({})
                     await axios.post(urlLogin, post).then((response) => {
                        console.log("*** Login ***")
                        //console.log("response",response)
                        usuario.value = localStorage.setItem('user', JSON.stringify(response.data));
                        state.value.user = JSON.parse(localStorage.getItem('user'));
                        if(response.data.status === "failed" || response.data.token == null){
                            alert("Usuario o contraseña incorrecta")
                        }else{
                            router.push('/');
                        }
                      });
             } catch (error) {
                 console.log(error);
             }finally{
                loadingUser.value = false;
             }
    }
    const logoutUser = () => {
        localStorage.removeItem('user');
        //state.value.user = localStorage.getItem('user');
        state.value.user = {
            user: JSON.parse(localStorage.getItem('user')),
            returnUrl: null
        };
        router.push('/account/login');
    }
    const registerUser = async(user) => {
        let urlRegUser = import.meta.env.VITE_API_SEGURL + "/api/seguridad/registrar-usuario";
          try {
            await axios.post(urlRegUser, user).then((response) => {
                console.log(response)    
                alert(response.data.message);
                if(response.data.status === "Success"){
                    router.push('/account/login');
                }else{
                    console.log("error")
                }
                });
          
          } catch (error) {
            console.log(error)
          }
    }
    const registerEmpleado = async(user) => {
        let urlRegUser = import.meta.env.VITE_API_SEGURL + "/api/seguridad/create-empleado";
        const token = state.value.user.token;
          try {
           await axios.post(urlRegUser, user, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
                //console.log(response)    
                //alert(response.data.message);

                if (confirm(response.data.message)) {
                    //console.log("IF de confirm")
                    window.location.reload();
                  }
            });
          
          } catch (error) {
            console.log(error)
          }
    }
    const cambiarPass = async(user, pass) => {
        let urlUpdatePass = import.meta.env.VITE_API_SEGURL + "/api/seguridad/update-password";
        const token = state.value.user.token;
        let post ={
            "email": user,
            "password": pass
        }
            try {
             await axios.put(urlUpdatePass, post, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
               //console.log(response)    
               alert(response.data.status);
                 });
          
            } catch (error) {
              console.log(error)
            }
    }
    const restablecerPass = async(email) => {
        let urlRestPass = import.meta.env.VITE_API_SEGURL + "/api/email/solicitud-reset-password?email=" + email;
        
            try {
              const response = await axios.post(urlRestPass);
              //console.log(response.data);
              if (confirm(response.data.message)) {
                router.push('/account/login');
              }
          
            } catch (error) {
                alert('Error al solicitar reset de contraseña')
                console.log('Error al solicitar reset de contraseña:',error)
            }
    }
    const resetPass = async(token, password) => {
      let urlRestPass = import.meta.env.VITE_API_SEGURL + "/api/email/reset-password";
      let post={
          "token": token,
          "password": password
      };
            try {
              const response = await axios.post(urlRestPass, post);
              //console.log(response.data);
                if(response.data.status === "Success"){
                    if (confirm(response.data.message)) {
                        router.push('/account/login');
                      }
                }
          
            } catch (error) {
                alert('Error al solicitar reset de contraseña')
                console.log('Error al solicitar reset de contraseña:',error)
            }
    }
    return { loginUser, logoutUser, registerUser, registerEmpleado, cambiarPass, restablecerPass, resetPass, state, loadingUser }
})