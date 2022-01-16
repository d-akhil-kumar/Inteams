'use strict'

const {errorLogger} = require('../services/loggers')

module.exports = (err, req, res, next) => {
    errorLogger(err)
    res.status(500).json(
        {
            status: 'error',
            msg: 'Internal Server Error'
        }
    )
}