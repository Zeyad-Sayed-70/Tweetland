const Models = require('../../Models');

const GetMyUserData = async (req, res) => {
    try {
        const id = req.uid;

        if ( !id ) {
          res.status(400).json({ message: "id is not defined" });
          return;
        }

        const data = await Models.UserAuth.findOne({_id: id});

        const RESDATA = {
            _id: data._id,
            username: data.username,
            tagName: data.tagName,
            birth: data.birth,
            email: data.email,
        }

        res.status(200).json({ message: "you have been fetch a user data successfully", userData: RESDATA });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
            res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })   
            return;
        }
    }
}

module.exports = { GetMyUserData };