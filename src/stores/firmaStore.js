import { defineStore } from "pinia";
import axios from "axios";
import { ref } from 'vue';
import {main_pfx, main_cer} from '@/firmav2/main-refactor.mjs';

const urlPKI = import.meta.env.VITE_API_PKIURL;

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

export const useFirmaStore = defineStore('firmaStore',() => {
    const catState = ref({
    });

    const rechazarDocumento = async(data, token) => {
        const url = urlPKI + "/api/documento/rechazar-documento";
        // console.log("rechazarDocumento")
        // console.log(data)
        // console.log(token)
        try {
             await axios.post(url, data, getAuthorizationHeadersForLaravel(token)).then((response) => {
             console.log(response)
                   if (confirm(response.data.message)) {
                        window.location.reload();
                      }
                });
            
           } catch (error) {
             console.log(error)
           }
    }
    const enviaFirma = async(fileCER, filePFX, fileKEY, contrasena, fileDocs, archivoEsCer, token) => {
      console.log("Envia Firma");
       const certFileData = {
               file: fileCER,
               buffer: null,
               base64: null,
               iscer: archivoEsCer,
             };
       const pfxFileData = {
               file: filePFX,
               buffer: null,
               base64: null,
               iscer: archivoEsCer,
             };
       const keyFileData = {
               file: fileKEY,
               buffer: null,
               base64: null,
             };
       const docFileData = {
               file: fileDocs,
               buffer: null,
               base64: null,
             };

       if(certFileData.file!=null){
       const certFileObj = await getMimeTypeAndArrayBufferFromFile_v2(fileCER);
       const keyFileObj = await getMimeTypeAndArrayBufferFromFile_v2(fileKEY);
       const codigoFirmaAplicada = 'Firmado';
      //  console.log("certFileObj", certFileObj);
      //  console.log("keyFileObj", keyFileObj);

       fileDocs.forEach(doc => {
         const pdfFileObj = doc.docBase64;
        //  console.log(pdfFileObj);
         main_cer(certFileObj.base64, keyFileObj.base64, contrasena, pdfFileObj, codigoFirmaAplicada, token, null);
       });

       }else if(pfxFileData.file!=null){
       const pfxFileObj = await getMimeTypeAndArrayBufferFromFile_v2(filePFX);
       const pdfFileObj = fileDocs[0].docBase64;
       //const pdfFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento);
       const codigoFirmaAplicada = 'Firmado';
       main_pfx(pfxFileObj.base64, contrasena, pdfFileObj, codigoFirmaAplicada, token, null);
       //main_pfx(pfxFileObj.base64, certificado.value.contrasenaCer, pdfFileObj.base64, codigoFirmaAplicada, token, null);
       }
    }

    //Funciones internas del store
    async function getMimeTypeAndArrayBufferFromFile_v2(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
    
        fileReader.onload = () => {
          const arrayBuffer = fileReader.result;
          const base64 = arrayBufferToBase64(arrayBuffer);
          const uint8 = new Uint8Array(arrayBuffer);
          //const blob = new Blob([arrayBuffer]);
          resolve({
            //mimeType: blob.type,
            arrayBuffer: arrayBuffer,
            base64: base64,
            uint8: uint8
          });
        };
    
        fileReader.onerror = () => {
          reject(new Error('No se pudo leer el archivo.'));
        };
    
        fileReader.readAsArrayBuffer(file);
      });
    }
    function arrayBufferToBase64(arrayBuffer) {
      const binary = new Uint8Array(arrayBuffer);
      let base64 = '';
      binary.forEach((byte) => {
        base64 += String.fromCharCode(byte);
      });
      return btoa(base64);
    }
    return { 
        catState, 
        rechazarDocumento,
        enviaFirma,
       }
})