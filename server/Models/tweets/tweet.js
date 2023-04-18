const mongoose = require('mongoose');

const TweetSchema = mongoose.Schema({
    type: {type: String, required: true},
    date: {type: Number, default: parseInt(new Date().getTime())},

    creator_data: {type: {
        _id: {type: String, required: true},
        username: {type: String, requried: true},
        avatar: {type: String},
        tagName: {type: String, required: true},
    }, required: true},

    content: {type: {
        text: String,
        url: String
    }, required: true},
    
    interactions: {type: {
        comments: Number,
        likes: {count: Number, users: []},
        retweets: {count: Number, users: []},
    }, default: { 
        comments: 0,
        likes: {count: 0, users: []},
        retweets: {count: 0, users: []}
    }}

}, { collection: 'tweets' })

module.exports = mongoose.model('Tweet', TweetSchema);