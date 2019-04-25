const mongoose = require('mongoose');
const questions = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pid: String,
    title: String,
    name: String,
    question: String,
});

module.exports = mongoose.model('Question', questions);