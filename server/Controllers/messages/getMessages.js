const Models = require('../../Models');

const GetMessages = async (req, res) => {
    try {
      const { chatId, userData } = req.body;

      if ( !chatId || userData === undefined ) {
        return res.status(404).json({ message: "something required is missing in your request body" });
      }

      const data = await Models.MessageSchema.findOne({ chatId: chatId[0] });

      if ( data === null ) {
        // create new chat
        const data = await Models.MessageSchema.create({chatId})

        return res.status(200).json({ message: "you have been created a chat successfully", data });
      }

      res.status(200).json({ message: "you have been fetched messages successfully", data });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { GetMessages };