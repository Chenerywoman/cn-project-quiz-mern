const mongoose = require('mongoose');

const result = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('result', result);