'use strict'

const userModel = require('../models/user')
const encryption = require('../utils/encryption')
const getUserProjects = require('../services/getUserProjects')
const mongoSanitize = require('mongo-sanitize')


exports.getAllUsers = async (req, res, next) => {
    try {
        const data = await userModel.find({}, { __v: 0, password: 0 }).lean()
        const dataCount = data.length

        if (dataCount > 0) {
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'List of all users',
                    data: {
                        count: dataCount,
                        users: data
                    }
                }
            )
        } else {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'No users for now'
                }
            )
        }
    } catch (error) {
        next(error)
    }
}

exports.getUserByEmail = async (req, res, next) => {
    try {
        const data = await userModel.findOne({ email: mongoSanitize(req.params.email) }, { __v: 0, password: 0 }).lean()

        if (data) {
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'user info',
                    data: {
                        user: data
                    }
                }
            )
        } else {
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'No such user exists'
                }
            )
        }
    } catch (error) {
        next(error)

    }
}

/**
 *  expected payload from frontends
 *  NOTE: refer user model for fields/attributes info
 *  
    {
    "email" : "abc@test.com",
    "password": "1231%%3",
    "isadmin": false,
    "projects": [
        {
            "name": "MOB-12-Subscribe",
            "groups": ["frontend", "backend"]
        },
        {
            "name": "WEB-1289-Subscribe",
            "groups": ["backend"]
        }
    ]
    }
    */
exports.registerUser = async (req, res, next) => {
    try {

        const userData = req.body

        //TODO [P:1]: check for valid email-id
        //TODO [P:1]: check for strong password

        //DONE [P:3]: encrypt password before storing                
        userData.password = encryption.encrypt(userData.password)
        await userModel.create(userData)

        res.status(201).json(
            {
                status: 'success',
                msg: 'User successfully registered'
            }
        )
    } catch (error) {
        next(error)

        //DONE [P:5]: check for email already exists
        if (error.code === 11000) {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'Email already exists'
                }
            )
        }
    }
}

exports.getFellowTeamMembers = async (req, res, next) => {
    try {
        // DONE [P:5]: get email from token
        const currentUserEmail = req.user.email

        const currentUserProjects = await getUserProjects(currentUserEmail)

        const data = await userModel.find(
            {
                $and: [
                    { "projects.name": { $in : currentUserProjects} },
                    { email: { $ne: currentUserEmail } }
                ]
            },
            { __v: 0, password: 0 }).lean()

        const dataCount = data.length

        if (dataCount > 0) {
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'List of team members',
                    data: {
                        count: dataCount,
                        users: data
                    }
                }
            )
        } else {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'No team members for now'
                }
            )
        }
    } catch (error) {
        next(error)
    }



}