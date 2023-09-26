import forge from 'node-forge';

export function getCertificadoAndPublicKeyAndPrivateKeyPFX(pfxBinary, password, payload){
  const pkcs12Asn1 = forge.asn1.fromDer(pfxBinary);
  decryptPFX(pkcs12Asn1, password, payload);
  let aliasBag = payload.data.certAliasBag;
  let keyAliasBag = payload.data.keyAliasBag;
  if(aliasBag!=null){
    let x509Cert = aliasBag.cert;
    let rsaPublicKeyParameters = aliasBag.cert.publicKey;

    if(keyAliasBag!=null){
      let rsaPrivateKeyParameters = keyAliasBag.key;
      payload.data = { x509Cert, rsaPublicKeyParameters, rsaPrivateKeyParameters};
    }else{
      payload.message = "No se encontró la llave privada";
    }
  }else{
    payload.message = "No es un certificado válido";
  }
}

function decryptPFX(pkcs12Asn1, password, payload){
  let certAliasBag = null;
  let keyAliasBag = null;
  try {
    const pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, password);
    const certBagAliases = pkcs12.getBags({ bagType: forge.pki.oids.certBag });
    const keyBagAliases = pkcs12.getBags({ bagType: forge.pki.oids.key });
    certAliasBag = extractAliasPFX(certBagAliases, payload);
    keyAliasBag = extractKeyPFX(keyBagAliases, payload);
    payload.data = { certAliasBag, keyAliasBag };
  } catch (err) {
    payload.message = "La contraseña de la llave privada es incorrecta";
    payload.data = { certAliasBag:null, keyAliasBag: null };
  }
}

function extractAliasPFX(certBagAliases, payload){
  for (const typeIdentifier in certBagAliases) {
    const bagArray = certBagAliases[typeIdentifier];
    if (bagArray) {
      for (const bag of bagArray) {
        if (bag.cert != null) {
          return bag;
        }
      }
    } else {
      payload.message = 'No se encontraron elementos para la identificación de tipo Cert:', typeIdentifier;
    }
  }
  return null;
}

function extractKeyPFX(keyBagAliases, payload){
  console.log('extractKeyPFX');
  for (const typeIdentifier in keyBagAliases) {
    const bagArray = keyBagAliases[typeIdentifier];
    if (bagArray) {
      for (const bag of bagArray) {
        if (bag.key != null) {
          return bag;
        }
      }
    } else {
      payload.message = 'No se encontraron elementos para la identificación de tipo Key:', typeIdentifier;
    }
  }
  return null;
}