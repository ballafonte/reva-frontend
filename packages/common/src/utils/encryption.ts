/**
 * Author: Princeton Legree (princetonlegree.com)
 * Copyright (c) 2023 Princeton Legree. All rights reserved.
 */
import CryptoJS from 'crypto-js';

const keySize = 256;
const ivSize = 128;
const iterations = 100;

export const encrypt = (message: string, password: string): string => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });

  const iv = CryptoJS.lib.WordArray.random(ivSize / 8);

  const encrypted = CryptoJS.AES.encrypt(message, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    hasher: CryptoJS.algo.SHA256,
  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
};

export const decrypt = (transitmessage: string, password: string): string => {
  const salt = CryptoJS.enc.Hex.parse(transitmessage.substring(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substring(32, 64));
  const encrypted = transitmessage.substring(64);

  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    hasher: CryptoJS.algo.SHA256,
  });
  const message = decrypted.toString(CryptoJS.enc.Utf8);
  return message;
};
