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
              const response = await axios.post(urlLogin, post);
              //console.log(response.data);
              const usuario = ref({});
              usuario.value = localStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('data', JSON.stringify(response.data.data));
              state.value.user = JSON.parse(localStorage.getItem('user'));
              if (response.data.status === "failed" || response.data.token == null) {
                showMessage(response.data.message,'error');
              } else {
                router.push('/');
              }
             } catch (error) {
                 console.log(error);
                 showMessage("No se encuentra registrado", 'error');
             }finally{
                loadingUser.value = false;
             }
    }
    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    
      return JSON.parse(jsonPayload);
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
                //console.log(response)    
                showMessage(response.data.message);
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
        let urlRegUser = import.meta.env.VITE_API_SEGURL + import.meta.env.VITE_CAT_ADD_EMPLEADOS;
        const token = state.value.user.token;
          try {
           await axios.post(urlRegUser, user, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
            
              if(response.data.status == "Fail"){
                showMessage(response.data.message, 'error');
              }else{
                showMessage(response.data.message);
                setTimeout(()=>{
                  router.push('/config/catalogo/personal');
                }, 500);
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
               console.log(response) 
               showMessage(response.data.status); 
               setTimeout(()=>{
                  window.location.reload();
                }, 500);
                 });
          
            } catch (error) {
              console.log(error)
            }
    }
    const restablecerPass = async(email) => {
        let urlRestPass = import.meta.env.VITE_API_SEGURL + "/api/email/solicitud-reset-password?email=" + email;
        
            try {
              const response = await axios.post(urlRestPass);
              console.log(response);
              new window.Swal({
                icon: 'success',
                title: '\u00A1Enviado!',
                text: response.data.message,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                padding: '2em',
              }).then((result) => {
                  if (result.value) {
                    //window.location.href = "/";
                    router.push('/account/login');
                  }
              });
              // if (confirm(response.data.message)) {
              //   router.push('/account/login');
              // }
          
            } catch (error) {
                // alert('Error al solicitar reset de contraseña')
                showMessage(error, 'error');
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
    const getMenuUser = async(token) => {
      let urlMenuUser = import.meta.env.VITE_API_SEGURL + "/api/seguridad/get-menu";
      let headers = {headers:{"Authorization": `Bearer ${token}`}};
            try {
              const response = await axios.get(urlMenuUser, headers);
              //console.log(response);
              return response;
            } catch (error) {
                console.log('Error al cargar menú:',error)
            }
    }
    const getUserInfo = async(id,token) => {
      let urlUserInfo = import.meta.env.VITE_API_SEGURL + import.meta.env.VITE_GET_USERINFO + id;
      let headers = {headers:{"Authorization": `Bearer ${token}`}};
            try {
              const response = await axios.get(urlUserInfo, headers);
              //console.log(response);
              return response.data.data;
            } catch (error) {
                console.log('Error al cargar menú:',error)
            }
    }
    
    const showMessage = (msg = '', type = 'success') => {
      const toast = window.Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
      });
      toast.fire({
          icon: type,
          title: msg,
          padding: '10px 20px',
      });
  };
    return { 
      loginUser, 
      logoutUser, 
      registerUser, 
      registerEmpleado, 
      cambiarPass, 
      restablecerPass, 
      resetPass, 
      state, 
      loadingUser,
      getMenuUser,
      getUserInfo
    }
})