import crypto from "crypto"

let digest = 'sha256';
let iterations = 99999;
let keyLength = 32;

export default {
    /**
     *
     * @param {String} password
     * @returns {Promise<unknown>}
     */
    createHash: (password) => {

        let executor = function(resolve, reject) {

            let callback = function(error, salt) {
                if (error) {
                    return reject(error);
                }

                let callback = function(error, key) {
                    if (error) {
                        return reject(error);
                    }

                    let buffer = Buffer.alloc(keyLength * 2);

                    salt.copy(buffer);
                    key.copy(buffer, salt.length);

                    resolve(buffer.toString('base64'));
                };

                crypto.pbkdf2(password, salt, iterations, keyLength, digest, callback);
            };

            crypto.randomBytes(keyLength, callback);
        };

        return new Promise(executor);
    },

    /**
     *
     * @param {String} password
     * @param {String} hash
     * @returns {Promise<unknown>}
     */
    isSame: (password,hash) => {

        let executor = function(resolve, reject) {

            let buffer = Buffer.alloc(keyLength*2, hash , 'base64');
            let salt = buffer.slice(0, keyLength);
            let keyA = buffer.slice(keyLength, keyLength * 2);

            let callback = function(error, keyB) {
                if (error) {
                    return reject(error);
                }

                resolve(keyA.compare(keyB) == 0);
            };

            crypto.pbkdf2(password, salt, iterations, keyLength, digest, callback);
        };

        return new Promise(executor);
    }
}