const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})



//export model
module.exports = mongoose.model('Post', postSchema)