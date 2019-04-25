const mongoose = require('mongoose');
const comments = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    qid: String,
    pid: String,
    comment: String,
    name: String,
    vote: Number
});

module.exports = mongoose.model('Comment', comments);
