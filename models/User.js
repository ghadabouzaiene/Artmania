const mongoose = require('mongoose')
const moment = require('moment-timezone')
const Schema = mongoose.Schema

const userSchema = Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: moment(Date.now()).tz('Europe/Paris').format('LLLL')
    },
    role: {
        type: String,
        enum: ['user', 'admin','visitor'],
        default: 'user'
    },
    isBanned: {
        type: String,
        default: "false"
    },
})

module.exports = mongoose.model('user', userSchema)