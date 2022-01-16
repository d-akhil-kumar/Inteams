const mongoose = require('../connections/mongoDB')

const ratingSchema = mongoose.Schema(
    {
        revieweeEmail: {
            type: String,
            trim: true,
            required: [true, 'Field Required']
        },
        reviewerEmail: {
            type: String,
            trim: true,
            required: [true, 'Field Required']
        },
        comment: {
            type: String
        },
        rating: {
            type: Number,
            required: [true, 'Field Required']
        },
        yearMonth: {
            type: String,
            required: [true, 'Field Required']
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
        collection: 'ratings'
    }
)


const ratingModel = mongoose.model('Rating', ratingSchema)
module.exports = ratingModel