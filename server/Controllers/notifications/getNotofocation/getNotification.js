const Models = require('../../../Models');

const GetNotification = async (req, res) => {
    try {
      const { id } = req.params;

      
      if ( !id ) {
        return res.status(404).json({ message: "id is not defined" });
      }
      
      const data = await Models.Notifications.find({ ownerId: id });
      
      if ( data === null ) {
        return res.status(400).json({ message: "id is not correct" });
      }

      res.status(200).json({ message: "you have been get notifications successfully", data });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { GetNotification };