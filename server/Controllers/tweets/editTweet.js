const Models = require('../../Models');

const EditTweet = async (req, res) => {
    try {
        const { text } = req.body;
        const { id } = req.params;

        if ( text === '' || text === undefined ) {
          res.status(400).json({ message: "text is not defined", data });
          return;
        }

        await Models.Tweets.updateOne({ _id: id }, { "content.text": text });
          
        res.status(200).json({ message: "you have been updated a tweet successfully" });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { EditTweet };