const Models = require('../../Models');

const CreateTweet = async (req, res) => {
    try {
        const { type, creator_data, content, isRetweet, pid } = req.body;
        const file = req.file;

        // prep our request
        let _filename, _creator_data, _content, text;
        
        if ( !isRetweet && type !== 'text' ) {
            _filename = file.filename;
            _creator_data = JSON.parse(creator_data);
            text = (JSON.parse(content)).text;
            _content = {
                text,
                url: _filename,
            };
        } 
        
        if ( isRetweet || type === 'text' ) {
            _creator_data = JSON.parse(creator_data);
            _content = JSON.parse(content);
        }


        if ( !type || Object.keys(_creator_data) < 3 || _content?.text === undefined ) {
            res.status(400).json({ message: "there're something missing!" });
            return;
        }
        
        if ( (type === 'image' || type === 'video') && _content?.url === undefined ) {
            res.status(400).json({ message: "url is missing!" });
            return;
        }

        const data = await Models.Tweets.create({
            type,
            creator_data: _creator_data,
            content: _content,
        });


        if ( data === null ) {
            res.status(400).json({ message: "please try again!" });
            return;
        }

        // increase Retweet count if this is retweet
        if ( isRetweet ) {
            const data = await Models.Tweets.findOneAndUpdate({ _id: pid }, { $inc: { "interactions.retweets.count": 1 }, $push: { "interactions.retweets.users": _creator_data._id } })
            res.status(200).json({ message: "you have been Retweeted successfully", data });
            return;
        }

        res.status(200).json({ message: "you have been created a tweet successfully", data });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { CreateTweet };