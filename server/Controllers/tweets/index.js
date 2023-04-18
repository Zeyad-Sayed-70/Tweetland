const { CreateTweet } = require('./createTweet');
const { GetTweets, GetTweet } = require('./getTweets');
const { ToggleLike } = require('./toggleLike');
const { DeleteTweet } = require('./deleteTweet');
const { EditTweet } = require('./editTweet');

const Controller = { 
    CreateTweet,
    GetTweets,
    GetTweet,
    ToggleLike,
    DeleteTweet,
    EditTweet,
};

module.exports = Controller;