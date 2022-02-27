const {Schema, model, trusted} = require('mongoose')

const PostItemSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const PostItem = model('PostItem', PostItemSchema)

module.exports = PostItem