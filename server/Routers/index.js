/* 
    @combination routers file
    -> Here you should call all routers in one 
       file and call this file in server.js file.
*/

const app = require('../app');

app.use('/authentication', require('./authentication/authentication'));
app.use('/tweets', require('./tweets/tweets'));
app.use('/user', require('./user/user'));
app.use('/notifications', require('./notifications/notifications'));
app.use('/chats', require('./messages/message'));

