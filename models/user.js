const mongoose = require('../connections/mongoDB')

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Field Required']
        },
        password: {
            type: String,
            required: [true, 'Field Required']
        },
        projects: [
            {
                name: {
                    type: String,
                    trim: true
                },
                groups: {
                    type: Array
                }
            }
        ],
        isadmin: {
            type: Boolean,
            default: false,
            required: [true, 'Field Required']
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        collection: 'users'
    }
)

userSchema.index({ email: 1 })
const userModel = mongoose.model('User', userSchema)
module.exports = userModel