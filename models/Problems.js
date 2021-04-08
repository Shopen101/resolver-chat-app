const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    tags: [
        {
            type: String,
        },
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    header: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('Problems', schema)
