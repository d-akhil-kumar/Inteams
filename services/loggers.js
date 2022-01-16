'use strict'

const fs = require('fs')

/**
 * Logs error into a local file
 * @param {object} error 
 */
exports.errorLogger = (error) => {
    let logMessage =  `${new Date()} - ${error.stack}\n`
    fs.appendFile('./logs/error_logs.log', logMessage, (err) => {
        if (err) console.log('error in logging errors')
        else console.log('something went wrong, "./logs/error_log.log" for more details')
    })
}


/**
 * Logs user request into a local file
 * @param {object} data 
 */
 exports.requestLogger = (data) => {
    let logMessage = `${new Date()} - ${data.method} - ${data.path}\n`
    fs.appendFile('./logs/request_logs.log', logMessage, (err) => {
        if(err) console.log(requestLogger)
    })
}