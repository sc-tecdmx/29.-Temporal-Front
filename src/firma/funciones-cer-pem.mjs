import forge from 'node-forge';

export function getCertificadoAndPublicKeyCER(cerBase64, payload){
  const pemCertificate = `-----BEGIN CERTIFICATE-----\n${cerBase64}\n-----END CERTIFICATE-----\n`;
  const x509Cert = forge.pki.certificateFromPem(pemCertificate);
  //console.log(x509Cert);
  const rsaPublicKeyParameters = x509Cert.publicKey;
  payload.data = { x509Cert, rsaPublicKeyParameters};
  payload.message = "El certificado es válido";
}

export function decryptPrivateKey(pemEncryptedPrivateKey, password, payload){
  try {
    let privateKeyDecriptedRsa = forge.pki.decryptRsaPrivateKey(pemEncryptedPrivateKey, password);
    //console.log(privateKeyDecriptedRsa);
    if(privateKeyDecriptedRsa!=null){
      payload.message = "La contraseña de la llave privada es correcta";
      return privateKeyDecriptedRsa;
    }else{
      payload.message = "La contraseña de la llave privada es incorrecta: "+password;
    }      
  } catch (err) {
    payload.message = "La contraseña de la llave privada es incorrecta: "+password;
  }
return null;
}