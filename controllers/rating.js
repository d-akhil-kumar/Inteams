'use strict'

const userModel = require('../models/user')
const ratingModel = require('../models/rating')
const getUserProjects = require('../services/getUserProjects')
const mongoSanitize = require('mongo-sanitize')


exports.getCurrentUserRatingComments = async (req, res, next) => {
    try {

        const currentUserEmail = req.user.email

        const data = await ratingModel.find(
            { revieweeEmail: currentUserEmail }
        ).select({ comment: 1, createdAt: 1 }).lean()

        const dataCount = data.length

        if (dataCount > 0) {
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'List of comments',
                    data: {
                        count: dataCount,
                        comments: data
                    }
                }
            )
        } else {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'No comments for now'
                }
            )
        }

    } catch (error) {
        next(error)
    }
}



exports.getCurrentUserAvgRating = async (req,res,next) => {
    try {

        const currentUserEmail = req.user.email

        const data = await ratingModel.aggregate(
            [
                { "$match": { revieweeEmail: currentUserEmail } },
                { $group: { _id: "$revieweeEmail", avg: { $avg: "$rating" } } }
            ]
        )

        const dataCount = data.length
        
        if (dataCount > 0) {
            res.status(200).json(
                {
                    status: 'success',
                    msg: 'avg rating',
                    data: data[0]
                }
            )
        } else {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'No ratings for now'
                }
            )
        }
    } catch (error) {
        next(error)
    }
}



/**
Expected payload
{
    "rating": 4,
    "comment": "hardworking"
}
 */
exports.rateFellowTeamMember = async (req, res, next) => {
    try {

        /// DONE [P:5]: get email from token
        const currentUserEmail = req.user.email

        const currentUserProjects = await getUserProjects(currentUserEmail)

        const dataCount = await userModel.count(
            {
                $and: [
                    { "projects.name": { $in: currentUserProjects } },
                    { email: mongoSanitize(req.params.email) },
                    { email: { $ne: currentUserEmail } },
                ]
            }
        )

        if (dataCount != 1 || req.user.isadmin) {
            res.status(400).json(
                {
                    status: 'error',
                    msg: 'You can\' rate this user'
                }
            )
        } else {
            let ratingData = req.body
            const currentDate = new Date()
            ratingData.revieweeEmail = mongoSanitize(req.params.email)
            ratingData.reviewerEmail = currentUserEmail
            ratingData.yearMonth = currentDate.getFullYear().toString() + currentDate.getMonth().toString()

            const isAlreadyRated = await ratingModel.findOne(
                {
                    $and: [
                        { revieweeEmail: ratingData.revieweeEmail },
                        { reviewerEmail: ratingData.reviewerEmail },
                        { yearMonth: ratingData.yearMonth },
                    ]
                }
            ).select({ _id: 1 }).lean()

            if (isAlreadyRated) {
                res.status(400).json(
                    {
                        status: 'error',
                        msg: 'You already rated this user, wait until next month'
                    }
                )
            } else {
                await ratingModel.create(ratingData)
                res.status(201).json(
                    {
                        status: 'success',
                        msg: 'You rated this user'
                    }
                )
            }
        }

    } catch (error) {
        next(error)
    }
}
