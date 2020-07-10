const jwt = require('jsonwebtoken')
const FavImage = require('../models/image.model')
const keys = require('../../keys')
const secretKey = keys.secretKey.secret

exports.favImg = (req, res) => {
    if (!secretKey) {
        res.send(403)
    } else {
        const { uniqueUsername, imgUrl } = req.body
        const imgData = {
            uniqueUsername: uniqueUsername,
            downloadUrl: imgUrl,
        }
        FavImage.find({ uniqueUsername: uniqueUsername }, (err, data) => {
            FavImage.create(imgData, (err, data) => {
                if (err) {
                    res.send({ msg: err.message })
                }
                else {
                    res.send('Added to favorite')
                }
            })

        })
    }
};
 
exports.getFavImg = (req, res) => {
    if (!secretKey) {
        res.send(403)
    } else {
        const { uniqueUsername } = req.body
        FavImage.find({ uniqueUsername: uniqueUsername }, (err, data) => {
            res.send(data)
        })
    }
}; 