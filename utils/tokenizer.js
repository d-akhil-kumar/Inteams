'use strict'

const jwt = require('jsonwebtoken')

/**
 * generates cryptic token by adding parameters into it
 * @param {_oid} id 
 * @param {String} email 
 * @param {Boolean} isAdmin 
 * @returns JWT sign token
 */
module.exports = (id, email, isAdmin) => {
    return jwt.sign(
        {
            email: email,
            userId: id,
            isAdmin: isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '12h'
        }
    )
}