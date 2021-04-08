const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    partner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },

    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = model('Dialogs', schema)
