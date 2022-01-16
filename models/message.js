const mongoose = require('../connections/mongoDB')

const msgSchema = mongoose.Schema(
    {
        project: {
            type: String,
            trim: true,
            required: [true, 'Field Required']
        },
        group: {
            type: String,
            trim: true,
            required: [true, 'Field Required']
        },
        senderName: {
            type: String
        },
        message: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
        collection: 'messages'
    }
)


const msgModel = mongoose.model('Message', msgSchema)
module.exports = msgModel