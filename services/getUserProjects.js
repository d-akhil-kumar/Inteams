const userModel = require('../models/user')

/**
 * Get list of projects assigned to a user/email
 * @param {String} email 
 * @returns {Array} project names
 */
module.exports = async (email) => {
    const userProjects = await userModel.aggregate([
        { "$match": { email: email } },
        {
            "$project": {
                "_id": 0,
                projects: "$projects.name"
            }
        }
    ])

    return userProjects[0].projects
}