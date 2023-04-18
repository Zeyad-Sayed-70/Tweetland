const Model = require('../../Models');

const GetTweets = async (req, res) => {
    try {
        const { SKIP } = req.body;
        const LIMIT = 8;

        if ( SKIP === undefined ) {
            res.status(404).json({ message: "SKIP is required" });
            return;
        }

        const data = await Model.Tweets.find({})
        .sort({ date: -1 })
        .skip(LIMIT*SKIP)
        .limit(LIMIT);

        if ( data === null ) {
            res.status(400).json({ message: "please try again!" });
            return;
        }

        res.status(200).json({ message: "fetch tweets are success", tweets: data })
    } catch (error) {
        console.log(error)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server" });   
            return;
        }
    }
}

const GetTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const { SKIP } = req.body;
        const LIMIT = 8;

        if ( SKIP === undefined ) {
            res.status(404).json({ message: "SKIP is required" });
            return;
        }

        if ( !id ) {
            res.status(400).json({ message: "id is undefined" });
            return;
        }

        const data = await Model.Tweets.find({"creator_data._id": id})
        .sort({ date: -1 })
        .skip(LIMIT*SKIP)
        .limit(LIMIT);


        if ( data === null ) {
            res.status(400).json({ message: "please try again!" });
            return;
        }

        res.status(200).json({ message: "fetch tweets are success", tweets: data })
    } catch (error) {
        console.log(error?.message)
        if ( error ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { GetTweets, GetTweet };