const Models = require('../../Models');

const CreateMessage = async (req, res) => {
    try {
      const { chatId, message } = req.body;
      
      if ( !chatId || !message ) {
        return res.status(404).json({ message: "something required is missing in your request body" });
    }
    
    const data = await Models.MessageSchema.findOneAndUpdate({ chatId: chatId[0] }, { $push: { messages: message } });
    
    if ( data === null ) {
        return res.status(404).json({ message: "this chatId is not exist" });
    }

      res.status(200).json({ message: "you have been created a message successfully" });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { CreateMessage };