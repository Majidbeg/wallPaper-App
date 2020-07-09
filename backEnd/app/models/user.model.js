const mongoose = require('mongoose');

const User = mongoose.Schema({
    uniqueUsername: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('User', User);