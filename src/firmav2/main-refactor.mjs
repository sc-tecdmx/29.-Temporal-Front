import { CertificateCer } from './CertificateCer.mjs';
import { CertificatePfx } from './CertificatePfx.mjs';
import { Document } from './Document.mjs';
import { Firma } from './Firma.mjs';
import fs from 'fs';

/* 
    Producción: http://52.206.121.172:8080/firma-pki
    Local: http:localhost:8081
*/

//const apiFirma = 'http://localhost:8081';
const apiFirma = 'http://52.206.121.172:8080/firma-pki';


const urlTransaccion = apiFirma+'/api/firma/transaccion/get-transaccion';
const urlOCPS = apiFirma+'/api/ocsp-validar'
const urlTSP = apiFirma+'/api/tsp-timestamp';
const urlBuildAndStoreFirma = apiFirma+'/api/documento/firmar-documento';

class ResponseBody {
    constructor(data, message, status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}

export function readContentTxt(filePath) {
    try {
        // Leer el contenido del archivo de manera síncrona
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}


/**--------------------------------------------------------------------------------------- 
 * --------------------------------------------------------------------------------------- 
 * --------------------------------------------------------------------------------------- 
 * --------------------------------------------------------------------------------------- 
*/

async function firmar(certificate, pdfBase64, codigoFirmaAplicada, token){
    
    let responseBody = new ResponseBody();
    const document = await new Document(pdfBase64);
    await document.initialize();
    console.log('----------------se carga documento');
    const firma = new Firma();
    console.log('----------------se carga firma');
    const isCertVigente = await certificate.isCertificadoVigente(responseBody);
    if(isCertVigente){//Validamos vigencia solo con datos del certificado
        console.log('--------------Es certVigente')
        const hasTransaccion = await firma.getTransaccion(document.hash, certificate.cerBase64, urlTransaccion, token, responseBody);//Obtenemos la transacción
        if(hasTransaccion){
            const validacionOCSP = await certificate.validateOCSP(firma.idTransaccion, urlOCPS, token, responseBody);//Validamos OCSP
            if(validacionOCSP){
                if(certificate.ValidateMatchCerKey(responseBody)){//Validamos la coincidencia de la lave privada con el certificado
                    const docToSign = document.pdfStamppedHashBase64!=null?document.pdfStamppedHashBase64:document.pdfBase64;
                    const estampaTSP = await firma.timeStampTSP(docToSign, urlTSP, token, responseBody);//Se realiza la estampa de tiempo
                    if(estampaTSP){
                        firma.sign(docToSign, certificate.x509Cert, certificate.privateKey); 
                        const firmado = await firma.buildAndSavePDF(codigoFirmaAplicada, document.hash, certificate.cerBase64, docToSign, urlBuildAndStoreFirma, token, responseBody);
                        console.log('Documento firmado');
                    }else{
                        console.log(responseBody);
                    }
                }
            }
        }else{
            console.log(responseBody);
        }
    }else{
        console.log(responseBody);
    }
}

export async function main_pfx(pfxBase64, password, pdfBase64, codigoFirmaAplicada, token){
    const certificate = new CertificatePfx(pfxBase64, password);
    firmar(certificate, pdfBase64, codigoFirmaAplicada, token);
}



export async function main_cer(cerBase64, keyBase64, password,
    pdfBase64, codigoFirmaAplicada, token){
    const certificate = new CertificateCer(cerBase64, keyBase64, password);
    firmar(certificate, pdfBase64, codigoFirmaAplicada, token);
}



main_cer();