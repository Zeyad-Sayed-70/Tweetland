const Models = require('../../Models');

const GetUsers = async (req, res) => {
    try {
        const data = await Models.UserAuth.find({}).select({ username: 1, email: 1, avatar: 1, tagName: 1 });

        if ( data === null ) {
          return res.status(404).json({ message: "there is something wronge" });
        }

        res.status(200).json({ message: "you have been fetch a users data successfully", usersData: data });
    } catch (error) {
        console.log(error?.message)
        if ( error?.message ) {
          return res.status(500).json({ message: "Error in internal server, you may miss somthing requried" })
        }
    }
}

module.exports = { GetUsers };