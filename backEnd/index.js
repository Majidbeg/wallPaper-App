const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cors());

// Connecting to the database
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise

const db = require('./utils/config')
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

require('./app/routes/signupLogin.routes')(app)
require('./app/routes/favImage.routes')(app)


// listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));


module.exports = app;