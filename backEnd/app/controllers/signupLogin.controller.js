const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const keys = require('../../keys')
const secretKey = keys.secretKey.secret


exports.signup = (req, res) => {
    const { uniqueUsername, email, password, } = req.body

    const userData = {
        uniqueUsername: uniqueUsername,
        email: email,
        password: password,
    }

    User.findOne({ uniqueUsername: uniqueUsername }, (err, data) => {
        if (data) {
            res.send({ type: "username already exists" })
        } else {
            User.findOne({ email: email }, (err, user) => {
                if (user) {
                    res.send({ type: "email already exists", msg: 'The email address you have entered is already associated with another account.' })
                } else if (!user) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        userData.password = hash;
                        User.create(userData, (err, data) => {
                            if (err) {
                                res.send({ msg: err.message })
                            } else {
                                res.send('registered success')
                            }
                        })
                    })
                }
            })
        }
    })
};

exports.login = (req, res) => {

    const { email, password } = req.body

    User.findOne({ email: email }, (err, user) => {
        if (!user) {
            res.send({ type: "account not found", msg: "We were unable to find a user for this user name" })

        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                res.send({ type: "wrong password", msg: "You entered a wrong password" })

            } else {
                payload = {
                    _id: user._id,
                    uniqueUsername: user.uniqueUsername,
                    email: user.email,
                }
                let userToken = jwt.sign(payload, secretKey, {
                    expiresIn: "12h"
                });
                res.status(200).json({ userToken: userToken, user: user.toJSON() });
            }
        }
    })
};