import CertificadoDTO from './models.js';
import { getCertificadoAndPublicKeyAndPrivateKeyPFX } from './funciones-pfx.mjs';
import { getCertificadoAndPublicKeyCER, decryptPrivateKey } from './funciones-cer-pem.mjs';
import { veryfyOCSP, getTimeStamp, testapi } from './services.mjs';
import { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber, PDFHexString, PDFString, PDFObject, decodePDFRawStream, rgb, degrees }
  from 'pdf-lib';
import { SHA256 } from 'crypto-js';
import forge from 'node-forge';
import PDFArrayCustom from './pdfArrayCustom.js';
import signer from 'node-signpdf';
import { saveAs } from 'file-saver';

class Payload {
  constructor(data, message) {
    this.data = data;
    this.message = message;
  }
}

function arrayBufferToBase64(arrayBuffer) {
  const binary = new Uint8Array(arrayBuffer);
  let base64 = '';
  binary.forEach((byte) => {
    base64 += String.fromCharCode(byte);
  });
  return btoa(base64);
}

function calculaPosicionFirma(numFirmas, x, y, h, w, maxWidth) {
  let num = 0;
  let num2 = 0;
  let numBoxes = maxWidth / w;
  num2 = numFirmas / numBoxes;
  num = numFirmas - numBoxes * (numFirmas / numBoxes);
  y += num * h;
  x += num2 * w;
  return { x, y };
}

function convertFromStringToDate(fechaString) {
  // Divide la cadena en sus componentes
  console.log('fechaString: ', fechaString)
  const [fecha, horaAmPm] = fechaString.split(' ');
  const [dia, mes, anio] = fecha.split('/');
  const [hora, minutos, segundos] = horaAmPm.split(':');
  const esPM = horaAmPm.toLowerCase() === 'p. m.';

  // Ajusta la hora si es PM (sumando 12 horas)
  let hora24 = parseInt(hora, 10);
  if (esPM && hora24 !== 12) {
    hora24 += 12;
  } else if (!esPM && hora24 === 12) {
    hora24 = 0;
  }

  // Crea un objeto Date
  const fechaObjeto = new Date(anio, mes - 1, dia, hora24, minutos, segundos);
  return fechaObjeto;
}

function unit8ToBuffer(unit8) {
  //let buf = Buffer.alloc(unit8.byteLength);


  // Crear un Uint8Array con la misma longitud
  const buf = new Uint8Array(unit8.length);

  const view = new Uint8Array(unit8);

  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

async function getMimeTypeAndArrayBufferFromFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      const base64 = arrayBufferToBase64(arrayBuffer);
      const uint8 = new Uint8Array(arrayBuffer);
      //const blob = new Blob([arrayBuffer]);
      //console.log(base64);
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
function ValidateMatchCerKey(payload) {
  //console.log(payload.data.x509Cert);
  if (payload.data.x509Cert != null) {
    if (
      (payload.data.rsaPrivateKeyParameters.n.toString(16) === payload.data.rsaPublicKeyParameters.n.toString(16))
      && (payload.data.rsaPrivateKeyParameters.e.toString(16) === payload.data.rsaPublicKeyParameters.e.toString(16))) {
      payload.message = 'La contraseña es correcta y la llave privada SI coincide con el certificado';
      return true;
    } else {
      payload.messag = 'La contraseña es correcta pero la llave privada NO coincide con el certificado';
    }
  } else {
    payload.message = 'No se obtuvo el certificado';
  }
  return false;
}

async function validateOCSPAndGetTimeStampPFX(certificadoBinaryBase64, originalname) {
  //console.log(certificadoDTO.certFileData);
  const ocspResponse = await veryfyOCSP(certificadoBinaryBase64, originalname);
  console.log('OCSP verification: ', ocspResponse.status);
  if (ocspResponse.status === 'Valid') {
    const tcaResponse = await getTimeStamp(certificadoBinaryBase64, ocspResponse.basicResponse);
    console.log('Este es el timestamp: ', tcaResponse.timestamp);
    return {
      'basicResponse': ocspResponse.basicResponse,
      'timestamp': tcaResponse.timestamp,
      'serialNumber': ocspResponse.serialNumber
    }
  }
}

async function validateOCSPAndGetTimeStamp(certificadoDTO) {
  console.log(certificadoDTO.certFileData.file.name);
  const reessp = await testapi();
  console.log(reessp);
  const ocspResponse = await veryfyOCSP(certificadoDTO.certFileData.base64, certificadoDTO.certFileData.file.name);
  console.log('OCSP verification: ', ocspResponse.status);
  if (ocspResponse.status === 'Valid' || ocspResponse.issuerCert !== null) {

    const tcaResponse = await getTimeStamp(certificadoDTO.certFileData.base64, ocspResponse.basicResponse);
    console.log('Este es el timestamp: ', tcaResponse.timestamp);
    return {
      'basicResponse': ocspResponse.basicResponse,
      'timestamp': tcaResponse.timestamp,
      'serialNumber': ocspResponse.serialNumber
    }
  }
}


function calculateSHA256Hash(data) {
  const hash = SHA256(data).toString();
  return hash;
}

async function PdfStamperHash(pdfData) {
  const pdfDoc = await PDFDocument.load(pdfData.buffer);
  const formFields = pdfDoc.getForm().getFields();
  if (formFields.length === 0) {//Si aún no ha sido firmado
    const pdfHash = calculateSHA256Hash(pdfData.buffer);//Se genera el hash del PDF
    //se estampa el hash a todas las páginas del documento PDF
    for (const [pageIndex, page] of pdfDoc.getPages().entries()) {
      const { width, height } = page.getSize();
      const fontSize = 9;

      const textOptions = {
        x: width - 30,
        y: height / 2,
        size: fontSize,
        color: rgb(0, 0, 1), // Azul
        rotateDegrees: degrees(-45)
      };

      const textContent = `${pdfHash}`; // Texto que deseas agregar
      const font = await pdfDoc.embedFont('Helvetica'); // Puedes cambiar la fuente si es necesario
      const textWidth = font.widthOfTextAtSize(textContent, fontSize);

      page.drawText(textContent, {
        x: textOptions.x - textWidth,
        y: textOptions.y,
        size: textOptions.size,
        color: textOptions.color,
        rotateDegrees: degrees(-45)
      });
      try {
        const pdfBytes = await pdfDoc.save();
        //savePDF(pdfBytes, 'pdf_result.pdf');
        return pdfBytes;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  } else {
    return pdfData;
  }

  return pdfDoc;
}

async function PdfStamperSign(pdfData, certificadoDTO, passphrase, x509Cert, timestamp, serialNumber) {
  const pfx = certificadoDTO.pfxFileData;
  const cer = certificadoDTO.certFileData;
  const key = certificadoDTO.keyFileData;

  const issuer = x509Cert.issuer; //Contiene toda la información de la autoridad certificadora
  const subject = x509Cert.subject; //Contiene toda la información del titular del certificado
  const titular = x509Cert.subject.getField('CN').value;




  if (pfx) {//Ingresó un certificado PFX
    let newPDF = loadPdfConfig(pdfData, 'docSigned.pdf', pfx.buffer, passphrase, titular, timestamp, serialNumber);

  } else if (cer) {//Ingresó un certificado CER
    const pemCertificate = `-----BEGIN CERTIFICATE-----\n${cer.base64}\n-----END CERTIFICATE-----\n`;
    const x509Cert = forge.pki.certificateFromPem(pemCertificate);

    const pemEncryptedPrivateKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----\n${key.base64}\n-----END ENCRYPTED PRIVATE KEY-----\n`;
    let privateKeyDecriptedRsa = forge.pki.decryptRsaPrivateKey(pemEncryptedPrivateKey, passphrase);
    const keypem = forge.pki.privateKeyToPem(privateKeyDecriptedRsa);
    const privateKeyDecrypted = forge.pki.privateKeyFromPem(keypem);
    const p12 = forge.pkcs12.toPkcs12Asn1(privateKeyDecrypted, x509Cert, passphrase,
      { generateLocalKeyId: true, friendlyName: 'test', algorithm: '3des' }
    );
    const p12Der = forge.asn1.toDer(p12).getBytes();
    //const pfx_temp = Buffer.from(p12Der, 'binary');
    const pfx_temp = new Uint8Array(p12Der).buffer;
    let newPDF = loadPdfConfig(pdfData, 'docSigned.pdf', pfx_temp, passphrase, titular, timestamp, serialNumber);
  }

}

async function loadPdfConfig(pdf, pdfName, pfx, passphrase, titular, fechaString, serialNumber) {
  const loadedPdf = await PDFDocument.load(pdf.buffer);
  const ByteRange = PDFArrayCustom.withContext(loadedPdf.context);
  const DEFAULT_BYTE_RANGE_PLACEHOLDER = '**********';
  const SIGNATURE_LENGTH = 5918;
  const pages = loadedPdf.getPages();
  const numPages = pages.length;

  const strSign = `Firma: ${titular}\nCertificado: ${serialNumber.slice(0, 37)}\nFecha: ${fechaString}\n`;

  const fWidth = 384; /* original 20f; */
  const fHeight = 240; /* 165f; */
  const x = 10; /*8f; */
  const y = 50; /*; 8f*/
  const fontSize = 7;/* 5f;*/
  const pageWidth = pages[numPages - 1].getWidth();
  const numFirmas = loadedPdf.getForm().getFields().length;
  console.log("numFirmas: ", numFirmas);
  const positions = calculaPosicionFirma(numFirmas, x, y, fHeight, fWidth, pageWidth - x);

  // Suponiendo que fontSize y BaseColor están definidos
  const font = await loadedPdf.embedFont('Helvetica'); // Puedes cambiar la fuente si es necesario
  //const textWidth = font.widthOfTextAtSize(strSign, fontSize);

  ByteRange.push(PDFNumber.of(0));
  ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
  ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
  ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));

  const signatureText = 'Firma Digital';
  const signatureColor = rgb(0, 0, 0); // Verde

  const signatureDict = loadedPdf.context.obj({
    Type: 'Sig',
    Filter: 'Adobe.PPKLite',
    SubFilter: 'adbe.pkcs7.detached',
    ByteRange,
    Contents: PDFHexString.of('A'.repeat(SIGNATURE_LENGTH)),
    Reason: PDFString.of('Agregar un motivo de firma...'),
    M: PDFString.fromDate(convertFromStringToDate(fechaString)),
  });


  const signatureDictRef = loadedPdf.context.register(signatureDict);

  const signatureSize = 7; // Tamaño de fuente deseado
  const text = pages[numPages - 1].drawText(strSign, {
    x: positions.x, // Coordenada X de la posición del texto
    y: positions.y, // Coordenada Y de la posición del texto
    size: signatureSize, // Tamaño de fuente
    color: rgb(0, 0, 0), // Color verde (RGB)
    font: font // Tipo de fuente
  });


  //const textDictRef = loadedPdf.context.register(text);

  const widgetDict = loadedPdf.context.obj({
    Type: 'Annot',
    Subtype: 'Widget',
    FT: 'Sig',
    Rect: [positions.x, 10, 200, 100], // Signature rect size
    V: signatureDictRef,
    T: PDFString.of(serialNumber),
    F: 4,
    P: pages[numPages - 1].ref,
  });

  const widgetDictRef = loadedPdf.context.register(widgetDict);

  // Add signature widget to the first page
  pages[numPages - 1].node.set(PDFName.of('Annots'), loadedPdf.context.obj([widgetDictRef]));

  loadedPdf.catalog.set(
    PDFName.of('AcroForm'),
    loadedPdf.context.obj({
      SigFlags: 3,
      Fields: [widgetDictRef],
    })
  );
  const pdfBytes = await loadedPdf.save({ useObjectStreams: false });

  const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
  let newPDF = await unit8ToBuffer(pdfBytes);
  //const signObj = new signer.SignPdf();
  //await signer.sign(newPDF, pfx, { passphrase: passphrase });
  //fs.writeFileSync(numeroAleatorio+pdfName, newPDF);
  //console.log(`New Signed PDF created called: ${pdfName}`);


  const blob = new Blob([newPDF], { type: 'application/pdf' });
  const fileName = numeroAleatorio + pdfName;

  // Crear un objeto File a partir del Blob
  const file = new File([blob], fileName, { type: 'application/pdf' });

  // Guardar el archivo utilizando FileSaver.js

  saveAs(file, pdfName);

  //const primerFirma = await newPDF.getSignature(0);
  //console.log(primerFirma);
  return pdfBytes;
}

async function firmarPDF(certificadoDTO, passphrase, x509Cert, timestamp, serialNumber) {
  //const pdfData = certificadoDTO.pdfFilesData[0];
  //Aqui va el recorrido de los pdfs que se van a firmar
  const pdfHashed = await PdfStamperHash(certificadoDTO.pdfFilesData);//Si aún no ha sido firmado estampa el hash a todas las páginas del documento PDF
  PdfStamperSign(
    pdfHashed,
    certificadoDTO,
    passphrase, x509Cert, timestamp, serialNumber);//Firma el documento PDF

}

function formatDateTime(originalDate) {
  const dateComponents = originalDate.split(', ');

  // Obtener la fecha y la hora por separado
  const [date, time] = dateComponents;

  // Dividir la fecha en día, mes y año
  const [month, day, year] = date.split('/');

  // Formatear la fecha en el nuevo formato
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
  return formattedDate;
}

function isCertificadoVigente(x509Cert, payload) {
  console.log(x509Cert.validity.notBefore);
  const notBeforeDate = x509Cert.validity.notBefore
  const notAfterDate = x509Cert.validity.notAfter;

  console.log('notBefore', notBeforeDate);
  console.log('notAfter', notAfterDate);

  // Obtén la fecha actual
  const currentDate = new Date();
  console.log('currentDate', currentDate);


  // Compara las fechas
  if (currentDate >= notBeforeDate) {
    if (currentDate <= notAfterDate) {
      console.log('La fecha actual está dentro del rango.');
      payload.message = 'La fecha actual está dentro del rango.';
      return true;
    } else {
      payload.message = 'La fecha actual 2 está fuera del rango.';
      return false;
    }
  } else {
    payload.message = 'La fecha actual 1 está fuera del rango.';
    return false;
  }
}


export const getCertificadoData = async (certFileData, keyFileData, pdfFilesData, password) => {
  const certFileObj = await getMimeTypeAndArrayBufferFromFile(certFileData.file);
  certFileData.buffer = certFileObj.arrayBuffer;
  certFileData.base64 = certFileObj.base64;
  certFileData.uint8 = certFileObj.uint8;
  //console.log(certFileData);

  const docFileObj = await getMimeTypeAndArrayBufferFromFile(pdfFilesData.file);
  pdfFilesData.buffer = docFileObj.arrayBuffer;
  pdfFilesData.base64 = docFileObj.base64;
  //console.log(pdfFilesData);

  let certificadoDTO = null;
  let payload = new Payload();

  if (certFileData.iscer === false) {//PFX

    certificadoDTO = new CertificadoDTO(certFileData, null, null, pdfFilesData, password);
    getCertificadoAndPublicKeyAndPrivateKeyPFX(certificadoDTO.pfxFileData.uint8, password, payload);
    console.log(payload);
    let x509Cert = payload.data.x509Cert;
    const isCerVigente = isCertificadoVigente(x509Cert, payload);
    console.log('isCerVigente', isCerVigente);
    if (isCerVigente) {
      if (ValidateMatchCerKey(payload)) {
        let certificatePem = forge.pki.certificateToPem(payload.data.x509Cert);
        certificatePem = certificatePem.replace("-----BEGIN CERTIFICATE-----", "");
        certificatePem = certificatePem.replace("-----END CERTIFICATE-----", "");
        certificatePem = certificatePem.replace(/\n/g, "");
        certificatePem = certificatePem.replace(" ", "");
        certificatePem = certificatePem.trim();
        //console.log('Este es el certificado: ', certificatePem);
        let responseOCSPTimeStamp = await validateOCSPAndGetTimeStampPFX(certificatePem);
        //Funcionalidad temporal para pruebas
        if (!responseOCSPTimeStamp) {
          responseOCSPTimeStamp = {
            'basicResponse': 'blablaba',
            'timestamp': '19/09/2023 10:29:42 p. m.',
            'serialNumber': '56545456456454'
          };

        }
        console.log('Este es el OCSP y timestamp: ', responseOCSPTimeStamp);
        firmarPDF(certificadoDTO, password, payload.data.x509Cert, responseOCSPTimeStamp.timestamp, responseOCSPTimeStamp.serialNumber);
        
      }

    } else {//Certificado expirado
      alert(payload.message);
    }

  } else if (certFileData.iscer === true) {//.CER
    const keyFileObj = await getMimeTypeAndArrayBufferFromFile(keyFileData.file);
    keyFileData.buffer = keyFileObj.arrayBuffer;
    keyFileData.base64 = keyFileObj.base64;

    //Certificado---------------------------------
    certificadoDTO = new CertificadoDTO(null, certFileData, keyFileData, pdfFilesData, password);
    getCertificadoAndPublicKeyCER(certificadoDTO.certFileData.base64, payload);
    let x509Cert = payload.data.x509Cert;

    // Obtener la fecha de validez "notAfter" del certificado

    const isCerVigente = isCertificadoVigente(x509Cert, payload);

    if (isCerVigente) {

      let rsaPublicKeyParameters = payload.data.rsaPublicKeyParameters;
      console.log(payload.message);

      //Private Key---------------------------------
      const keyBase64 = certificadoDTO.keyFileData.base64;
      const pemEncryptedPrivateKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----\n${keyBase64}\n-----END ENCRYPTED PRIVATE KEY-----\n`;
      const rsaPrivateKeyParameters = decryptPrivateKey(pemEncryptedPrivateKey, password, payload);
      if (rsaPrivateKeyParameters != null) {
        payload.data = { x509Cert, rsaPublicKeyParameters, rsaPrivateKeyParameters };
        console.log('here', payload);
        if (ValidateMatchCerKey(payload)) {

          const responseOCSPTimeStamp = await validateOCSPAndGetTimeStamp(certificadoDTO);
          /*  const responseOCSPTimeStamp = {'basicResponse':'blablaba', 
            'timestamp':'19/09/2023 10:29:42 p. m.',
            'serialNumber':'56545456456454'};*/


          console.log('Este es el OCSP y timestamp: ', responseOCSPTimeStamp);
          firmarPDF(certificadoDTO, password, payload.data.x509Cert, responseOCSPTimeStamp.timestamp, responseOCSPTimeStamp.serialNumber);
        }
      } else {//Contraseña incorrecta
        alert(payload.message);
      }
    } else {//Certificado expirado
      alert(payload.message);
    }




  }

}