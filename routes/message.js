const express = require('express')
const msgController = require('../controllers/message')
const msgRouter = express.Router()

            
msgRouter.get('/:project/:group', msgController.getMessagesByProjectAndGroup) //can do pagination skip=10&limit=5
         .post('/:project/:group', msgController.addMessage)

module.exports = msgRouter