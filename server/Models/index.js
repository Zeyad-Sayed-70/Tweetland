const UserAuth = require('./authentication/user');
const Tweets = require('./tweets/tweet');
const Notifications = require('./notifications/notifications');
const MessageSchema = require('./messages/messages');

module.exports = { 
    UserAuth, 
    Tweets,
    Notifications,
    MessageSchema,
};