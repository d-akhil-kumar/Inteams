'use strict'

const {requestLogger} = require('../services/loggers')

module.exports = (req, res, next) => {
    requestLogger(req)
    next()
}
