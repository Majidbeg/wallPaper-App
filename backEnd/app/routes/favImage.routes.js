module.exports = (app) => {

    const favoriteImage = require('../controllers/favImage.controller.js');

    app.post('/fav_image', favoriteImage.favImg)

    app.post('/get_fav_image', favoriteImage.getFavImg)


} 