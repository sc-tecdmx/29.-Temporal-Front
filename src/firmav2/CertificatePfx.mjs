import forge from 'node-forge';
import axios from 'axios'

const axiosInstance = axios.create({
    "Access-Control-Allow-Origin": "*"
});

export class CertificatePfx {
    constructor(pfxBase64, password) {
        this.x509Cert;
        this.publicKey;//Es el mismo que: rsaPublicKeyParameters
        this.privateKey;//Es el mismo que: privateKeyDecriptedRsa == rsaPrivateKeyParameters
        this.p12;
        this.pfx;

        this.notBeforeDate;
        this.notAfterDate;

        this.numeroSerie;
        this.indicador;

        this.cerBase64;
        this.pfxBase64 = pfxBase64;
        this.password = password;
        this.loadData();
    }

    loadData() {
        // const buffer = Buffer.from(this.pfxBase64, 'base64');
        // const pkcs12Asn1 = forge.asn1.fromDer(buffer.toString('binary'));
        const buffer = new Uint8Array(atob(this.pfxBase64).split('').map(char => char.charCodeAt(0)));
        const pkcs12Asn1 = forge.asn1.fromDer(String.fromCharCode.apply(null, buffer));

        const bags = this.decryptPFX(pkcs12Asn1, this.password);
        let aliasBag = bags.certAliasBag;
        let keyAliasBag = bags.keyAliasBag;
        if (aliasBag != null) {
            this.x509Cert = aliasBag.cert;
            const pemCert = forge.pki.certificateToPem(this.x509Cert);
            const base64Cert = pemCert
                .replace('-----BEGIN CERTIFICATE-----', '')
                .replace('-----END CERTIFICATE-----', '')
                .replace(/\r\n|\n|\r/g, '');

            this.cerBase64 = base64Cert.trim();
            this.publicKey = aliasBag.cert.publicKey;

            if (keyAliasBag != null) {
                const rsaPrivateKeyParameters = keyAliasBag.key;
                const privateKeyPem = forge.pki.privateKeyToPem(rsaPrivateKeyParameters);
                this.privateKey = forge.pki.decryptRsaPrivateKey(privateKeyPem, this.password);
            }
        }
    }

    decryptPFX(pkcs12Asn1, password) {
        let certAliasBag = null;
        let keyAliasBag = null;
        try {
            const pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, password);
            const certBagAliases = pkcs12.getBags({ bagType: forge.pki.oids.certBag });
            const keyBagAliases = pkcs12.getBags({ bagType: forge.pki.oids.key });
            certAliasBag = this.extractAliasPFX(certBagAliases);
            keyAliasBag = this.extractKeyPFX(keyBagAliases);
            return { certAliasBag, keyAliasBag };
        } catch (err) {
            console.log("La contraseña de la llave privada es incorrecta");
            responseBody.data = false;
            responseBody.status = "fail";
            responseBody.message = 'La contraseña de la llave privada es incorrecta';
            return responseBody;
        }
    }

    extractAliasPFX(certBagAliases) {
        for (const typeIdentifier in certBagAliases) {
            const bagArray = certBagAliases[typeIdentifier];
            if (bagArray) {
                for (const bag of bagArray) {
                    if (bag.cert != null) {
                        return bag;
                    }
                }
            }
        }
        return null;
    }

    extractKeyPFX(keyBagAliases) {
        for (const typeIdentifier in keyBagAliases) {
            const bagArray = keyBagAliases[typeIdentifier];
            if (bagArray) {
                for (const bag of bagArray) {
                    if (bag.key != null) {
                        return bag;
                    }
                }
            }
        }
        return null;
    }

    isCertificadoVigente(responseBody) {
        this.notBeforeDate = this.x509Cert.validity.notBefore
        this.notAfterDate = this.x509Cert.validity.notAfter;
        const currentDate = new Date();
        if (currentDate >= this.notBeforeDate) {
            if (currentDate <= this.notAfterDate) {
                //console.log('El certificado es vigente')
                return true;
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
                responseBody.status = "succes";
                return responseBody;
            } else {
                responseBody.status = "fail";
                responseBody.message = 'La contraseña es correcta pero la llave privada NO coincide con el certificado';
            }
        } else {
            responseBody.status = "fail";
            responseBody.message = 'No se obtuvo el certificado';
        }
        return false;
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
                responseBody.data = false;
                responseBody.status = "fail";
                responseBody.message = response.message;
                return responseBody;
            }
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}