import { defineStore } from "pinia";
import axios from "axios";
import { ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_LARURL;

const envApp = 'prod';

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
    const loadingArea = ref(false);
    const loadingCat = ref(false);
    const getCatArea = async(token) => {
        const urlCat = baseUrl + "/api/get-catalogo/areas";
        try {
            //const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
            const { data } = await axios.get(urlCat, getAuthorizationHeadersForLaravel(token));
            catState.value.catArea = data;
        } catch (error) {
            console.log(error);
        }finally{
           //loadingArea.value = false;
        }
    }
    const getCatPuesto = async(token) => {
        const urlCat = baseUrl + "/api/get-catalogo/puestos";
        try {
            //const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
            const { data } = await axios.get(urlCat, getAuthorizationHeadersForLaravel(token));
            // catState.value.catPuesto = data;
            return data;
        } catch (error) {
            console.log(error);
        }finally{
           //loadingArea.value = false;
        }
    }
    const getCatSexo = async(token) => {
        const urlCat = baseUrl + "/api/get-catalogo/sexo";        
        try {
            //const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
            const { data } = await axios.get(urlCat, getAuthorizationHeadersForLaravel(token));
            
            return data;
        } catch (error) {
            console.log(error);
        }finally{
           //loadingArea.value = false;
        }
    }

    const getCatalogo = async(url, token) => {
        const urlCat = baseUrl + url;
        try {
            //local
            //const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
            //servidor
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
            const axiosInstance = axios.create({
               "Access-Control-Allow-Origin": "*",
           });
           //local
           //await axios.post(urlSaveCat, data, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
            //servidor
            await axios.post(urlSaveCat, data, getAuthorizationHeadersForLaravel(token)).then((response) => {
            
                 if (confirm(response.data.message)) {
                      window.location.reload();
                    }
                });
            
           } catch (error) {
             console.log(error)
           }
    }
    const editCatalogo = async(urlCat, data, token) => {
        const urlEditCat = baseUrl + urlCat;
        try {
            //local
                //await axios.put(urlEditCat, data, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
            //servidor
                await axios.put(urlEditCat, data, getAuthorizationHeadersForLaravel(token)).then((response) => {
                 if (confirm(response.data.message)) {
                      window.location.reload();
                   }
                });
            
           } catch (error) {
             console.log(error)
           }
    }
    const deleteCatalogo = async(urlCat, token) => {
        const urlDelCat = baseUrl + urlCat;
        try {
            //local
            //await axios.delete(urlDelCat, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
            //servidor
            await axios.delete(urlDelCat, getAuthorizationHeadersForLaravel(token)).then((response) => {
                  if (confirm(response.data.message)) {
                       window.location.reload();
                    }
                 });
            
           } catch (error) {
             console.log(error)
           }
    }
    const getNuevoDocumento = async(urlNewDoc, token) => {
        try {
            //local
             //const { data } = await axios.get(urlNewDoc, {headers:{"Authorization": `Bearer ${token}`}});
             //servidor
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

    return { 
        catState, 
        //getCatArea, 
        //getCatPuesto, 
        //getCatSexo, 
        getCatalogo, 
        saveCatalogo, 
        editCatalogo, 
        deleteCatalogo,
        getNuevoDocumento, 
        getDetalleDocumento }
})