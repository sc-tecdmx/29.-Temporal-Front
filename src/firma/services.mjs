import axios from 'axios'

const axiosInstance = axios.create({
         "Access-Control-Allow-Origin": "*"
       });

export async function veryfyOCSP(certificate, fileName) {
    const url = 'http://localhost:8080/api/oscpi-verification/';

    const data = {
        certificate: certificate,
        fileName: fileName,
    }
    // const axiosInstance = axios.create({
    //     "Access-Control-Allow-Origin": "*"
    //   });
      
    try {
        const response = await axiosInstance.post(url, data);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función si es necesario.
    }
}

export async function getTimeStamp(certificate, message) {
    const url = 'http://localhost:8080/api/tsa-tsp/';

    const data = {
        certificate: certificate,
        responseOCSP: message,
    }
    try {
        const response = await axiosInstance.post(url, data);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función si es necesario.
    }
}

