'use strict'

const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()

const bcrypt_salt = process.env.BCRYPT_SALT || 10
const genSalt = bcrypt.genSaltSync(parseInt(bcrypt_salt))

const encryption = {
    encrypt: (plainText) => {
        return bcrypt.hashSync(plainText, genSalt)
    },
    decrypt: (plainText, encryptedText) => {
        return bcrypt.compare(plainText, encryptedText)
    }
}

module.exports = encryption