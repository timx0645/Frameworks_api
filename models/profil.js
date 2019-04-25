const mongoose = require('mongoose');
const profil = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    psw: String,
    name: String
});

module.exports = mongoose.model('Profil', profil);