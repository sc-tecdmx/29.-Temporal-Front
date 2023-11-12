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
            const res = await axiosInstance.get(url, {headers:{"Authorization": `Bearer ${token}`}});
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
