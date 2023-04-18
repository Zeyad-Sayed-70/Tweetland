const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  chatId: { type: Array, required: true, unique: true},
  // userData: { type: Object, required: true },
  messages: { type: [
    {
      uid: String,
      username: String,
      message: String,
      date: { type: String, default: new Date().getTime() }
    }
  ], default: [] },
  date: { type: String, default: new Date().getTime() },
}, { collection: 'messages' })

module.exports = mongoose.model('Messages', MessageSchema);