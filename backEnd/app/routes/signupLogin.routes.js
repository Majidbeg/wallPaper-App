module.exports = (app) => {

    const user = require('../controllers/signupLogin.controller.js');

    app.post('/signup', user.signup)

    app.post('/login', user.login)

} 