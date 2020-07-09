const mongoose = require('mongoose');

const FavImage = mongoose.Schema({
    uniqueUsername: { type: String },
    downloadUrl: { type: String },
})

module.exports = mongoose.model('FavImage', FavImage);  