const mongoose = require('mongoose');

const Notifications = mongoose.Schema({
  userData: {
    username: {type: String, required: true},
    avatar: {type: String},
    _id: {type: String, required: true}
  },
  noteMsg: {type: String, required: true},
  ownerId: {type: String, required: true},  
}, { collection: 'notifications' })

module.exports = mongoose.model('notifications', Notifications);