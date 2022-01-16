const express = require('express')
const userController = require('../controllers/user')
const isAdmin = require('../middlewares/isAdmin')
const userRoute = express.Router()

userRoute.get('/', isAdmin, userController.getAllUsers)          //need to be admin
         .get('/team', userController.getFellowTeamMembers)
         .get('/:email', userController.getUserByEmail)         
         .post('/register', isAdmin, userController.registerUser)    //need to be admin

module.exports = userRoute