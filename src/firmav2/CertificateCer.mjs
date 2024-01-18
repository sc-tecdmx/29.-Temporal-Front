import forge from 'node-forge';
import axios from 'axios'

const axiosInstance = axios.create({
    "Access-Control-Allow-Origin": "*"
});

export class CertificateCer {
    constructor(cerBase64, keyBase64, password, responseBody) {
        this.x509Cert;
        this.publicKey;//Es el mismo que: rsaPublicKeyParameters
        this.privateKey;//Es el mismo que: rsaPrivateKeyParameters
        this.p12;
        this.pfx;

        this.notBeforeDate;
        this.notAfterDate;

        this.numeroSerie;
        this.indicador;

        this.cerBase64 = cerBase64;
        this.keyBase64 = keyBase64;
        this.password = password;

        this.loadFirma; //PAO
        this.loadData(responseBody);
    }

    loadData(responseBody) {
        //Certificado y llave pública
        const pemCertificate = `-----BEGIN CERTIFICATE-----\n${this.cerBase64}\n-----END CERTIFICATE-----\n`;
        this.x509Cert = forge.pki.certificateFromPem(pemCertificate);
        this.publicKey = this.x509Cert.publicKey;

        //LLave privada
        const pemEncryptedPrivateKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----\n${this.keyBase64}\n-----END ENCRYPTED PRIVATE KEY-----\n`;
        try {
            this.privateKey = forge.pki.decryptRsaPrivateKey(pemEncryptedPrivateKey, this.password); //rsaPrivateKeyParameters
        } catch (error) {
            responseBody.data = false;
            responseBody.status = "fail";
            responseBody.message = 'La contraseña es incorrecta';
            return responseBody;
        }
        if (this.privateKey === null) {
            responseBody.data = false;
            responseBody.status = "fail";
            responseBody.message = 'La contraseña es incorrecta';
            return responseBody;
        } else {
            //Generación de pfx
            const keypem = forge.pki.privateKeyToPem(this.privateKey);
            const privateKeyDecrypted = forge.pki.privateKeyFromPem(keypem);
            this.p12 = forge.pkcs12.toPkcs12Asn1(privateKeyDecrypted, this.x509Cert, this.password,
                { generateLocalKeyId: true, friendlyName: 'test', algorithm: '3des' }
            );
            const p12Der = forge.asn1.toDer(this.p12).getBytes();
            this.pfx = new Uint8Array(p12Der).buffer;
            responseBody.data = true;
            responseBody.status = "success";
            responseBody.message = 'Se han cargado los datos correctamente';
            return responseBody;
        }


    }

    isCertificadoVigente(responseBody) {
        this.notBeforeDate = this.x509Cert.validity.notBefore
        this.notAfterDate = this.x509Cert.validity.notAfter;
        const currentDate = new Date();
        if (currentDate >= this.notBeforeDate) {
            if (currentDate <= this.notAfterDate) {
                //console.log('El certificado es vigente')
                responseBody.data = true;
                return responseBody;
            }
        }
        responseBody.data = false;
        responseBody.status = "fail";
        responseBody.message = 'El certificado no es vigente';
        return responseBody;
    }

    ValidateMatchCerKey(responseBody) {
        if (this.x509Cert != null) {
            if (
                (this.privateKey.n.toString(16) === this.publicKey.n.toString(16))
                && (this.privateKey.e.toString(16) === this.publicKey.e.toString(16))) {
                //console.log('La contraseña es correcta y la llave privada SI coincide con el certificado');
                responseBody.data = true;
                return responseBody;
            } else {
                responseBody.status = "fail";
                responseBody.message = 'La contraseña es correcta pero la llave privada NO coincide con el certificado';
            }
        } else {
            responseBody.status = "fail";
            responseBody.message = 'No se obtuvo el certificado';
        }
        responseBody.data = false;
        return responseBody;
    }

    async validateOCSP(idTransaccion, url, token, responseBody) {
        const headers = {
            'Authorization': 'Bearer ' + token, // Reemplaza 'tuTokenAquí' con tu token real
            'Content-Type': 'application/json'
        };
        const data = {
            idTransaccion: idTransaccion,
            certificado: this.cerBase64,
        }
        try {
            const response = await axiosInstance.post(url, data, { headers: headers });
            //console.log(response.data);
            this.numeroSerie = response.data.data.numeroSerie;
            this.indicador = response.data.data.indicador;
            if (this.indicador != 'GOOD') {
                responseBody.status = "fail";
                responseBody.message = response.message;
                responseBody.data = false;
                return responseBody;
            }
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}