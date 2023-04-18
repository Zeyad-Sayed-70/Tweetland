const Models = require('../Models');

const createNotification = async (req, res, next) => {
  try {
    const oid = req.oid;
    const pid = req.pid;
    const userData = req.userData;
    const noteMsg = req.noteMsg;
    const resData = req.resData || {};

    if ( !oid || !pid || !noteMsg || userData === undefined ) {
      return res.status(404).json({ message: "there is something missing" });
    }

    await Models.Notifications.create({
      userData,
      ownerId: oid,
      noteMsg,
    })

    res.status(200).json(resData);
  } catch (error) {
    console.log(error?.message)
    if ( error?.message ) {
        res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
        return;
    }
  }
}

module.exports = createNotification;