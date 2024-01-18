import { defineStore } from "pinia";
import axios from "axios";
import { ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_LARURL;

const envApp = import.meta.env.VITE_ENV_APP;

  function getAuthorizationHeadersForLaravel(token) {
    
  if(envApp=='prod'){
    return {
      headers: {
        "bearertoken": `${token}`
      }
    };
  }else{
    return {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };
  }
}

export const useCatalogoStore = defineStore('catalogoStore',() => {
    const catState = ref({
        catArea: [],
        catPuesto: [],
        catSexo: []
    });
    const loadingCat = ref(false);

    const getCatalogo = async(url, token) => {
        const urlCat = baseUrl + url;
        try {
            const { data } = await axios.get(urlCat, getAuthorizationHeadersForLaravel(token));
            return data;
        } catch (error) {
            console.log(error);
        }finally{
           //loadingCat.value = false;
        }
    }
    const saveCatalogo = async(urlCat, data, token) => {
        const urlSaveCat = baseUrl + urlCat;
        
        try {
            await axios.post(urlSaveCat, data, getAuthorizationHeadersForLaravel(token)).then((response) => {
              //console.log("Resp",response)
              showMessage('\u00A1Guardado!');
              setTimeout(()=>{
                window.location.reload();
              }, 800);
                });
            
           } catch (error) {
             console.log(error)
           }
    }
    const editCatalogo = async(urlCat, data, token) => {
        const urlEditCat = baseUrl + urlCat;
        try {
                await axios.put(urlEditCat, data, getAuthorizationHeadersForLaravel(token)).then((response) => {
                  showMessage('\u00A1Editado!');
                  setTimeout(()=>{
                    window.location.reload();
                  }, 800);
                });
            
           } catch (error) {
             console.log(error)
           }
    }
    const deleteCatalogo = async(urlCat, token) => {
        const urlDelCat = baseUrl + urlCat;
        try {
          new window.Swal({
              icon: 'warning',
              title: '\u00BFDesea eliminar este elemento?',
              text: "Esta opci\u00F3n sera eliminada definitivamente",
              showCancelButton: true,
              confirmButtonText: 'Eliminar',
              padding: '2em',
          }).then(async(result) => {
              if (result.value) {
                await axios.delete(urlDelCat, getAuthorizationHeadersForLaravel(token)).then((response) => {
                  //console.log(response.data)
                  showMessage('\u00A1Eliminado!');
                  setTimeout(()=>{
                    window.location.reload();
                  }, 800);
                });
              }
          });
            
           } catch (error) {
             console.log(error)
           }
    }
    const getNuevoDocumento = async(urlNewDoc, token) => {
        try {
             const { data } = await axios.get(urlNewDoc, getAuthorizationHeadersForLaravel(token));
             return data;    
           } catch (error) {
             console.log("Error",error)
           }
    }
    const getDetalleDocumento = async(urlDetalle, token) => {
        try {
            const { data } = await axios.get(urlDetalle, getAuthorizationHeadersForLaravel(token));
            //const { data } = await axios.get(urlDetalle, {headers:{"bearertoken": `${token}`}});
            return data;    
           } catch (error) {
             console.log(error)
           }
    }
    const getDocumentsUser = async(url, token) => {
      try {
        const { data } = await axios.get(url, {headers:{"Authorization": `Bearer ${token}`}});  
          return data;    
         } catch (error) {
           console.log(error)
         }
  }

  const getNotificaciones = async(url, token) =>{
    try {
      const axiosInstance = axios.create({
        "Access-Control-Allow-Origin": "*",
      });
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }finally{
        //loading.value = false
    }
  }

  //Alerts
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
        catState, 
        getCatalogo, 
        saveCatalogo, 
        editCatalogo, 
        deleteCatalogo,
        getNuevoDocumento, 
        getDetalleDocumento,
        getDocumentsUser,
        getNotificaciones
       }
})