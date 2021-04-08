const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    text: {
        type: String,
        required: true,
    },

    data_time: {
        type: Date,
        default: Date.now,
    },

    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },

    dialog: {
        type: Types.ObjectId,
        ref: 'Dialogs',
        required: true,
    },
})

module.exports = model('Message', schema)
