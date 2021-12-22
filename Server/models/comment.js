const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    TaskId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },

});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };