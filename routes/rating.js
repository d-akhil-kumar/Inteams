const express = require('express')
const ratingController = require('../controllers/rating')
const ratingRoute = express.Router()



ratingRoute.get('/', ratingController.getCurrentUserRatingComments)
            .get('/average', ratingController.getCurrentUserAvgRating)
            .post('/:email', ratingController.rateFellowTeamMember)
         
         

module.exports = ratingRoute