import axios from 'axios'

const axiosInstance = axios.create({
    "Access-Control-Allow-Origin": "*"
   });

   export async function testapi() {
    const url = 'http://localhost:8082/firmaocsp/api/v'
    //const url = 'http://52.206.121.172:8080/firmaocsp/api/v'
    axios.get()
  .then(response => {
    // Handle the successful response here
    console.log('Respuesta exitosa:', response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error en la solicitud:', error);
  });
}

export async function veryfyOCSP(certificate, fileName) {
    const url = 'http://localhost:8082/api/oscpi-verification/';//Local
    //const url = 'http://52.206.121.172:8080/firmaocsp/api/oscpi-verification/';//Production
    const data = {
        certificate: certificate,
        fileName: fileName,
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

export async function getTimeStamp(certificate, message) {
    const url = 'http://localhost:8082/api/tsa-tsp/';//Local
    //const url = 'http://52.206.121.172:8080/firmaocsp/api/tsa-tsp/';//Production
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

