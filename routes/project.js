const express = require('express')
const projectController = require('../controllers/project')
const projectRoute = express.Router()



projectRoute.get('/:project', projectController.getProjectByName)
         

module.exports = projectRoute