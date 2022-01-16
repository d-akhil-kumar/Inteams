'use strict'

const mongoose = require('mongoose')

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/inteamdb'

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


mongoose.connection.on('connected', () => {
    console.log('inTeamDB connected succesfully')
})

mongoose.connection.on('reconnected', () => {
    console.log('inTeamDB reconnected')
})

mongoose.connection.on('error', error => {
    console.log('inTeamDB connection error', error)
    mongoose.disconnect()
})

mongoose.connection.on('disconnected', () => {
    console.log('inTeamDB is disconnected')
    process.exit(1)
})


module.exports = mongoose