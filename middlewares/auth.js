'use strict'

const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(403).json(
                {
                    status: 'error',
                    msg: 'Login Required'
                }
            )
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            //to use User's email id for fetching user's data in controlllers
            /*
            req.user = {
                _id: '',
                email: '',
                isAdmin: ''
            }
            */
            req.user = decoded
        } catch (err) {
            return res.status(401).json(
                {
                    status: 'error',
                    msg: 'Invalid Token or Expired, login Again'
                }
            )
        }

        return next()
    } catch (error) {
        next(error)
    }
}