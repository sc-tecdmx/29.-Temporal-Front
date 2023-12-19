import axios from 'axios'
import forge from 'node-forge';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

const axiosInstance = axios.create({
    "Access-Control-Allow-Origin": "*"
});

export class Firma {
    constructor() {
        this.idTransaccion;

        this.fechaUTC;
        this.nombreRespondedor;
        this.emisorRespondedor;
        this.secuencia;
        this.datosEstampillados;

        this.firmaSize;
        this.signatureBase64;
    }

    async getTransaccion(hashDocumento, cerBase64, url, token, responseBody) {
        //const url = 'http://localhost:8080' + '/api/firma/transaccion/get-transaccion';
        const headers =   {
             'Authorization': 'Bearer ' + token, // Reemplaza 'tuTokenAquí' con tu token real
             'Content-Type': 'application/json'
         };
        const data = {
            hashDocumento: hashDocumento,
            certificado: cerBase64,
        }
        try {
            const response = await axiosInstance.post(url, data, { headers: headers });
            //console.log(response.data);
            
            if (response.data.status != 'Success' || response.data.data == null) {
                responseBody.status = "Fail";
                responseBody.message = response.data.message;
                return false;
            }
            this.idTransaccion = response.data.data.idTransaccion;
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async timeStampTSP(messageDigest, url, token, responseBody) {
        const headers = {
            'Authorization': 'Bearer ' + token, // Reemplaza 'tuTokenAquí' con tu token real
            'Content-Type': 'application/json'
        };
        const data = {
            idTransaccion: this.idTransaccion,
            messageDigest: messageDigest,
        }
        try {
            const response = await axiosInstance.post(url, data, { headers: headers });
            //console.log(response.data);
            this.fechaUTC = response.data.data.fechaUTC;
            this.nombreRespondedor = response.data.data.nombreRespondedor;
            this.emisorRespondedor = response.data.data.emisorRespondedor;
            this.secuencia = response.data.data.secuencia;
            this.datosEstampillados = response.data.data.datosEstampillados;
            if (response.data.status != 'Success') {
                responseBody.status = "Fail";
                responseBody.message = response.data.message;
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async sign(pdfBase64, x509Cert, key) {
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');

        const p7 = forge.pkcs7.createSignedData();
        p7.content = forge.util.createBuffer(pdfBuffer.toString('binary'));
        p7.addCertificate(x509Cert);
        p7.addSigner({
            key: key,
            certificate: x509Cert,
            digestAlgorithm: forge.pki.oids.sha256,
            authenticatedAttributes: [
                {
                    type: forge.pki.oids.contentType,
                    value: forge.pki.oids.data,
                },
                {
                    type: forge.pki.oids.messageDigest,
                    value: forge.util.createBuffer(),
                },
                {
                    type: forge.pki.oids.signingTime,
                    value: new Date(),
                },
            ],
        });
       /*p7.sign({ detached: true });
        const rawSignedData = forge.asn1.toDer(p7.toAsn1()).getBytes();
        this.firmaSize = rawSignedData.length;
        console.log("Tamaño contenido", this.firmaSize);
        const hash = CryptoJS.SHA256(rawSignedData).toString();
        this.signatureBase64 = Buffer.from(hash, 'binary').toString('base64');
        */

        p7.sign({ detached: true });
        const rawSignedData = forge.asn1.toDer(p7.toAsn1()).getBytes();
        this.firmaSize = rawSignedData.length;
        console.log("Tamaño contenido", this.firmaSize);
        //const hash = createHash('sha256');
        //hash.update(rawSignedData);
        this.signatureBase64 = Buffer.from(rawSignedData, 'binary').toString('base64');

        // Conversión a Base64 usando funciones nativas del navegador
        //signatureBase64.value = btoa(rawSignedData);
    }

    async buildAndSavePDF(codigoFirmaAplicada, hashDocumento, certificado, documento, url, token, responseBody) {
        const headers = {
            'Authorization': 'Bearer ' + token, // Reemplaza 'tuTokenAquí' con tu token real
            'Content-Type': 'application/json'
        };
        const data = {
            idTransaccion: this.idTransaccion,
            codigoFirmaAplicada: codigoFirmaAplicada,
            hashDocumento: hashDocumento,
            certificado: certificado,
            cadenaFirma: this.signatureBase64,
            documento: documento,
        }
        try {
            const response = await axiosInstance.post(url, data, { headers: headers });
            //console.log(response.data);
            if (response.data.status != 'Success') {
                responseBody.status = "Fail";
                responseBody.message = response.data.message;
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}