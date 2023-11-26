import { defineStore } from "pinia";
import axios from "axios";
import { ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_LARURL;

export const useCatalogoStore = defineStore('catalogoStore',() => {
    const state = ref({
        catArea: [],
        catPuesto: []
    });
    const loadingArea = ref(false);
    const getCatArea = async(token) => {
        const urlCat = baseUrl + "/api/get-catalogo/areas";
        try {
            const { data } = await axios.get(urlCat, {headers:{"Authorization": `Bearer ${token}`}});
            state.value.catArea = data;
            // setTimeout(()=>{
            //     loadingArea.value = true;
            //   }, 10);
              //return state.value.catArea;
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
            state.value.catPuesto = data;
        } catch (error) {
            console.log(error);
        }finally{
           //loadingArea.value = false;
        }
    }
    return { getCatArea, getCatPuesto, state }
})