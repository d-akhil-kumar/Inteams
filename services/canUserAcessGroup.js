const userModel = require('../models/user')

/**
 * To check if user belongs to the project and group
 * @param {object} msgData 
 * @returns {boolean}
 */
module.exports = async (msgData) => {
    const data = await userModel.count(
        {
            $and: [
                { email: msgData.user },
                { "projects.name": msgData.project },
                { "projects.groups": msgData.group }
            ]
        }
    )

    if(data === 1){
        return true
    } else {
        return false
    }
}