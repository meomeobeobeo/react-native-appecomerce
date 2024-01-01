import { SHA256, MD5 } from 'react-native-crypto-js'

import NodeRSA from 'react-native-rsa-native'
import { RSA, RSAKeychain } from 'react-native-rsa-native'
import { JSHash, JSHmac, CONSTANTS } from 'react-native-hash'

//function generate private key and public key
async function generatePairKey() {
    let keys = await RSA.generateKeys(4096)

    return {
        privateKey: keys.private,
        publicKey: keys.public,
    }
}

// Function to create a SHA-256 hash of the data
async function createHash(data) {
    return await JSHash(data, CONSTANTS.HashAlgorithms.sha256)
}

// Function to sign hashed data
async function signData(data, privateKey) {
    const hashedData = await createHash(data)
    console.log('Hashed data:', hashedData)
    const signature = await RSAKeychain.sign(hashedData, privateKey)
    return signature
}

// Function to verify the signature of hashed data
async function verifySignature(data, signature, publicKey) {
    const hashedData = await createHash(data)
    return await RSAKeychain.verify(hashedData, signature, publicKey)
}

export { generatePairKey, signData, verifySignature, createHash }
