const mongoose = require('mongoose');

const UserAuthenticationModel = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    birth: {type: String, required: true},
    tagName: {type: String, required: true, unique: true},
})

module.exports = mongoose.model('User_Authentication', UserAuthenticationModel);