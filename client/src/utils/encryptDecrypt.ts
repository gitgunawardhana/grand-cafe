import CryptoJS from "crypto-js";

// Secret key for encryption (you should keep this secret)
const secretKey = import.meta.env.VITE_CRYPTOJS;

// Encrypt the passcode
function encryptPasscode(passcode: string) {
  const encrypted = CryptoJS.AES.encrypt(passcode, secretKey).toString();
  return encrypted;
}

// Decrypt the passcode
function decryptPasscode(encryptedPasscode: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedPasscode, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

export { decryptPasscode, encryptPasscode };
