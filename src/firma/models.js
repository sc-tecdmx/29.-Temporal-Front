class CertificadoDTO {
    constructor(pfxFileData, certFileData, keyFileData, pdfFilesData, password) {
        this.pfxFileData = pfxFileData;
        this.certFileData = certFileData;
        this.keyFileData = keyFileData;
        this.pdfFilesData = pdfFilesData;
        this.password = password;
    }
}
export default CertificadoDTO;