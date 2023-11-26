import { PDFDocument, rgb, degrees } from 'pdf-lib';
import crypto from 'crypto';

export class Document {
    constructor(pdfBase64) {
        this.pdfBase64 = pdfBase64;
    }

    async initialize() {
        console.log('se inicializa')
        this.pdfBase64StamppedHash;
        this.bufferPDF =  await this.obtenerBufferPDF(this.pdfBase64);
        this.hash = await this.calculateSHA256(this.pdfBase64);
        this.calculateSHA256(this.pdfBase64).then(hash => this.hash = hash);
        
        console.log(this.hash)
        await this.pdfStamperHash();
    }


    async obtenerBufferPDF(docb64) {
        // Crear Blob a partir de base64
        const blob = this.base64ToBlob(docb64, 'application/pdf');
    
        // Convertir Blob a ArrayBuffer
        const buffer = await blob.arrayBuffer();
        return buffer;
    }

    base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64); // Decodifica un string de datos codificados en base64
        const byteNumbers = new Array(byteCharacters.length);
      
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
      
        const byteArray = new Uint8Array(byteNumbers);
      
        return new Blob([byteArray], { type: mimeType });
      }
      /*
    calcularSHA256() {
        const hash = CryptoJS.SHA256(this.pdfBase64);
        console.log('hash', hash);
        hash = hash.toString(CryptoJS.enc.Hex);
        console.log(hash);
        return hash;
    }
    */

    async calculateSHA256(base64String) {
        // Convierte el base64 a una cadena binaria
        const binaryString = window.atob(base64String);
    
        // Convierte la cadena binaria a un ArrayBuffer
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
    
        // Calcula el hash SHA256 usando la Web Crypto API
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', bytes);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log('hashHex',hashHex);
        return hashHex;
    }

    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
    
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
    
        // btoa convierte un string binario a un string en base64
        return btoa(binary);
    }

    async pdfStamperHash() {
        console.log(this.bufferPDF);
        const pdfDoc = await PDFDocument.load(this.bufferPDF);
        const formFields = pdfDoc.getForm().getFields();
        if (formFields.length === 0) {//Si aún no ha sido firmado
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

                const textContent = `${this.hash}`; // Texto que deseas agregar
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
                    const pDFStamppedHash = await pdfDoc.save();
                    //const buffer = await this.obtenerBufferPDF(pDFStamppedHash);
                    //const buffer = arrayBufferToBase64(pdfStamppedHash);
                    // Convertir el Buffer a una cadena Base64
                    this.pdfStamppedHashBase64 = this.arrayBufferToBase64(pDFStamppedHash);


                    console.log('uhere', this.pdfStamppedHashBase64);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    }

}