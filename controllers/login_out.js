'use strict'

const tokenizer = require('../utils/tokenizer')
const userModel = require('../models/user')
const encryption = require('../utils/encryption')


/**
Expected payload from frontend
    {
    "email" : "akhil@test.com",
    "password": "213sad33##@"
    }
*/
exports.login = async (req, res, next) => {
    try {
        const data = await userModel.findOne({ email: req.body.email }, { __V: 0 }).lean()

        if (data) {
            if (await encryption.decrypt(req.body.password, data.password)) {

                //DONE [P:5]: create token and store user id, email, and isadmin
                const token = tokenizer(data._id, data.email, data.isadmin)

                res.cookie('token', token).status(200).json(
                    {
                        status: 'success',
                        msg: 'user info',
                        data: {
                            id: data._id,
                            email: data.email,
                            projects: data.projects,
                            isadmin: data.isadmin
                        }
                    }
                )
            }
            else {
                res.status(401).json(
                    {
                        status: 'error',
                        msg: 'Invalid email or password'
                    }
                )
            }
        }
        else {
            res.status(401).json(
                {
                    status: 'error',
                    msg: 'Email doesn\'t exists'
                }
            )
        }
    } catch (error) {
        next(error)
    }
}


exports.logout = async (req,res,next) => {
    try {
        res.clearCookie('token').status(200).json(
           {
            status: 'success',
            msg: 'Successful logout'
           }
        )      
    } catch (error) {
        next(error)
    }
}