'use strict'

const projectModel = require('../models/project')
const getUserProjects = require('../services/getUserProjects')
const mongoSanitize = require('mongo-sanitize')

exports.getProjectByName = async (req, res, next) => {
    try {
        const currentUserEmail = req.user.email
        const projectName = mongoSanitize(req.params.project)

        // user can only see the projects assign to him
        const currentUserProjects = await getUserProjects(currentUserEmail)

        if( currentUserProjects.includes(projectName)){
            const data = await projectModel.findOne({name: projectName}, { _id: 0, __v: 0 })

            res.status(200).json(
                {
                    status: 'success',
                    msg: 'project information',
                    data: data
                }
            )

        } else {
            res.status(200).json(
                {
                    status: 'error',
                    msg: 'No such project exists'
                }
            )
        }
    } catch (error) {
        next(error)

    }
}