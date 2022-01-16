'use strict'

module.exports = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(401).json(
                {
                    status: 'error',
                    msg: 'You cant access this API'
                }
            )
        }
    } catch (error) {
        next(error)
    }
}