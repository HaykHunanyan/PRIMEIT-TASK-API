const crypto = require('crypto');

const inputEncoding = 'utf8';
const outputEncoding = 'hex';

/**
 * @param app
 */
function Crypto(app) {
  const { hash, algorithm } = app.get('encrypt');
  /**
   * @param text String
   * @returns String
   */
  function encrypt(text) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(algorithm, hash, iv);
    let encrypted = cipher.update(text, inputEncoding, outputEncoding);
    encrypted += cipher.final(outputEncoding);

    return `${iv.toString(outputEncoding)}:${encrypted}`;
  }
  /**
   * @param text String
   * @returns String
   */
  function decrypt(text) {
    const textParts = text.split(':');
    // extract the iv from the first half of the text
    const iv = Buffer.from(textParts.shift(), outputEncoding);
    // extract the encrypted text without the IV
    const encryptedText = Buffer.from(textParts.join(':'), outputEncoding);
    // decipher the string
    const decipher = crypto.createDecipheriv(algorithm, hash, iv);
    let decrypted = decipher.update(
      encryptedText,
      outputEncoding,
      inputEncoding
    );
    decrypted += decipher.final(inputEncoding);

    return decrypted;
  }

  return {
    encrypt,
    decrypt,
  };
}

module.exports = app => {
  app.set('crypto', new Crypto(app));
};
