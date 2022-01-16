const projectModel = require('../models/project')
const userModel = require('../models/user')
const { projects, users } = require('./dummy_data')

module.exports = async (req, res, next) => {
    try {

        const usersDataCount = await userModel.count()
        const projectsDataCount = await projectModel.count()

        if (usersDataCount < 1)
            await userModel.create(users)
        else if (projectsDataCount < 1)
            await projectModel.create(projects)

        res.status(201).json({
            status: 'success',
            msg: 'data added'
        })
    } catch (error) {
        next(error)
    }
}