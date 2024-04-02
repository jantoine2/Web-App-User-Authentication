const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');

// Stores a Buffer object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'Super secret message');

// I you try and 'crack the code', you will just get gibberish
console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf-8');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());