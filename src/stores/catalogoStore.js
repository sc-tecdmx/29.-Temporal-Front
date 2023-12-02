import { defineStore } from "pinia";
import axios from "axios";
import { ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_LARURL;

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
            const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
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
            const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
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
            const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
            
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
            const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
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
              await axios.post(urlSaveCat, data, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
                if (confirm(response.data.mensaje)) {
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
        //     const axiosInstance = axios.create({
        //        "Access-Control-Allow-Origin": "*",
        //    });
               await axios.put(urlEditCat, data, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
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
        //     const axiosInstance = axios.create({
        //        "Access-Control-Allow-Origin": "*",
        //    });
                await axios.delete(urlDelCat, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
                  if (confirm(response.data.mensaje)) {
                       window.location.reload();
                    }
                 });
            
           } catch (error) {
             console.log(error)
           }
    }
    return { getCatArea, getCatPuesto, getCatSexo, catState, getCatalogo, saveCatalogo, editCatalogo, deleteCatalogo }
})