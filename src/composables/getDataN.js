import { ref } from 'vue';
import axios from 'axios';

export const useGetData = () => {

    const data = ref(null);
    const errorData = ref(null);
    const loading = ref(true);

     const axiosInstance = axios.create({
         "Access-Control-Allow-Origin": "*",
       });

    const getData = async (url, token) => {

        try {
            if(url.includes(import.meta.env.VITE_API_LARURL)){
                console.log('incluye' + import.meta.env.VITE_API_LARURL);
                const res = await axiosInstance.get(url, {headers:{"bearertoken": `${token}`}});
            }else{
                const res = await axiosInstance.get(url, {headers:{"Authorization": `Bearer ${token}`}});
            }
            
            data.value = res.data;
        } catch (error) {
            //console.log(error.code);
            //switch de errores
            switch(error){
                case 'ERR_NETWORK':
                    errorData.value = 'Error de conexión'
                    break;
                default:
                    errorData.value = 'Error de servidor'
                    break;
              }
        }finally{
            loading.value = false
        }
    };
    return{
        getData,
        data,
        loading,
        errorData,
    }
};
