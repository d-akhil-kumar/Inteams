const mongoose = require('../connections/mongoDB')

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Field Required']
        },
        groups: {
            type: Array,
            required: [true, 'Field Required']
        },
        about: {
            type: String,
            required: [true, 'Field Required']
        },
        stack: {
            type: Array,
            required: [true, 'Field Required']
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        collection: 'projects'
    }
)

projectSchema.index({ name: 1 })
const projectModel = mongoose.model('Project', projectSchema)
module.exports = projectModel