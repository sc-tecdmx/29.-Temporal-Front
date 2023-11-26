import { CertificateCer } from './CertificateCer.mjs';
import { CertificatePfx } from './CertificatePfx.mjs';
import { Document } from './Document.mjs';
import { Firma } from './Firma.mjs';
import fs from 'fs';

const apiFirma = 'http://localhost:8081';
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
    document.hash = '9b91c7fe46cb525edf8419b4a2ae0347dfdfdd6ea217eae0bd58b61f308b695b';
    console.log('----------------se carga documento');
    const firma = new Firma();
    console.log('----------------se carga firma');
    const isCertVigente = await certificate.isCertificadoVigente(responseBody);
    if(isCertVigente){//Validamos vigencia solo con datos del certificado
        console.log('--------------Es certVigente')
        const hasTransaccion = await firma.getTransaccion('9b91c7fe46cb525edf8419b4a2ae0347dfdfdd6ea217eae0bd58b61f308b695b', certificate.cerBase64, urlTransaccion, token, responseBody);//Obtenemos la transacción
        if(hasTransaccion){
            const validacionOCSP = await certificate.validateOCSP(firma.idTransaccion, urlOCPS, token, responseBody);//Validamos OCSP
            if(validacionOCSP){
                if(certificate.ValidateMatchCerKey(responseBody)){//Validamos la coincidencia de la lave privada con el certificado
                    const docToSign = document.pdfStamppedHashBase64!=null?document.pdfStamppedHashBase64:document.pdfBase64;
                    const estampaTSP = await firma.timeStampTSP(docToSign, urlTSP, token, responseBody);//Se realiza la estampa de tiempo
                    if(estampaTSP){
                        firma.sign(docToSign, certificate.x509Cert, certificate.privateKey); 
                        const firmado = await firma.buildAndSavePDF(codigoFirmaAplicada, '9b91c7fe46cb525edf8419b4a2ae0347dfdfdd6ea217eae0bd58b61f308b695b', certificate.cerBase64, docToSign, urlBuildAndStoreFirma, token, responseBody);
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

export async function main_pfx_test(){
    const pfxBase64 = readContentTxt('./llaves/pfxBase64.txt');
    const password = '08011269Ee';
    const pdfBase64 = readContentTxt('./llaves/pdfBase64.txt');
    const codigoFirmaAplicada = 'Firmado';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MDAxNzg3ODMsImlzcyI6Imh0dHBzOi8vd3d3LnRlY2RteC5vcmcubXgvIiwic3ViIjoiZ3JhY2llbGEuaWxsZXNjYXNAdGVjZG14Lm9yZy5teCIsImV4cCI6MTcwMTA0Mjc4M30.bAhe5njTfaYLMZSn4_T6rdmESHV9oavbZ55uc4SxZ7K7PdEx8dMC8CtJlE2sTcX4QNTouziEPSIBTp5qXVtFXw';

    const certificate = new CertificatePfx(pfxBase64, password);
    firmar(certificate, pdfBase64, codigoFirmaAplicada, token);
}

export async function main_cer(cerBase64, keyBase64, password,
    pdfBase64, codigoFirmaAplicada, token){
    const certificate = new CertificateCer(cerBase64, keyBase64, password);
    firmar(certificate, pdfBase64, codigoFirmaAplicada, token);
}

export async function main_cer_test(){
    const cerBase64 = readContentTxt('./llaves/cerBase64.txt');
    const keyBase64 = readContentTxt('./llaves/keyBase64.txt');
    const password = 'geia9769';
    const pdfBase64 = readContentTxt('./llaves/pdfBase64.txt');
    const codigoFirmaAplicada = 'Firmado';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MDAxNzg3ODMsImlzcyI6Imh0dHBzOi8vd3d3LnRlY2RteC5vcmcubXgvIiwic3ViIjoiZ3JhY2llbGEuaWxsZXNjYXNAdGVjZG14Lm9yZy5teCIsImV4cCI6MTcwMTA0Mjc4M30.bAhe5njTfaYLMZSn4_T6rdmESHV9oavbZ55uc4SxZ7K7PdEx8dMC8CtJlE2sTcX4QNTouziEPSIBTp5qXVtFXw';

    const certificate = new CertificateCer(cerBase64, keyBase64, password);
    firmar(certificate, pdfBase64, codigoFirmaAplicada, token);
}

main_cer();