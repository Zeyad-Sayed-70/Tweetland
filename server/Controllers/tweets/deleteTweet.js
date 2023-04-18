const Models = require('../../Models');

const DeleteTweet = async (req, res) => {
    try {
        const { id } = req.params;

        if ( !id ) {
          res.status(400).json({ message: "id is not defined", data });
          return;
        }

        await Models.Tweets.deleteOne({ _id: id });
          
        res.status(200).json({ message: "you have been deleted a tweet successfully" });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { DeleteTweet };