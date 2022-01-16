'use strict'

const msgModel = require('../models/message')
const mongoSanitize = require('mongo-sanitize')
const canUserAcessGroup = require('../services/canUserAcessGroup')

exports.getMessagesByProjectAndGroup = async (req, res, next) => {
    try {

        const msgData = {
            project: mongoSanitize(req.params.project),
            group: mongoSanitize(req.params.group),
            user: mongoSanitize(req.user.email)
        }

        //to ensure if user belongs to the group
        const canAccess = await canUserAcessGroup(msgData)

        if (canAccess) {
            const data = await msgModel.find(
                {
                    $and: [
                        { project: msgData.project },
                        { group: msgData.group }
                    ]
                },
                { _id: 0, __v: 0 },
                { skip: req.query.skip, limit: req.query.limit }
            ).lean()

            const dataCount = data.length

            if (dataCount > 0) {
                res.status(200).json(
                    {
                        status: 'success',
                        msg: 'List of all messages',
                        data: {
                            count: dataCount,
                            messages: data
                        }
                    }
                )
            } else {
                res.status(200).json(
                    {
                        status: 'success',
                        msg: 'No messages for now'
                    }
                )
            }

        } else {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'you cant access this project or group'
                }
            )
        }
    } catch (error) {
        next(error)
    }
}


/**
 Expected payload from frontend
    {
      "message": "hi all"
    }
*/
exports.addMessage = async (req, res, next) => {
    try {

        //DONE [P:5]: get user data from request
        const msgData = {
            project: mongoSanitize(req.params.project),
            group: mongoSanitize(req.params.group),
            user: req.user.email,
            message: req.body.message
        }

        //to ensure if user belongs to the group
        const canAccess = await canUserAcessGroup(msgData)

        if (canAccess) {
            //TODO [P:5]: add socket broadcast
            await msgModel.create(msgData)
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'msg sent'
                }
            )
        } else {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'you cant access this project or group'
                }
            )
        }

    } catch (error) {
        next(error)
    }
}