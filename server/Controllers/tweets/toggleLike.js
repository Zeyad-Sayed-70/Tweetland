const Models = require("../../Models");

const ToggleLike = async (req, res, next) => {
  try {
    const { type, pid, uid, me, oid } = req.body;

    if (!type || !pid || !uid) {
      res.status(400).json({ message: "type is missing" });
      return;
    }

    let data;

    if (type === "DEC")
      data = await Models.Tweets.findOneAndUpdate(
        { _id: pid },
        {
          $inc: { "interactions.likes.count": -1 },
          $pull: { "interactions.likes.users": uid },
        },
        { new: true }
      );
    else
      data = await Models.Tweets.findOneAndUpdate(
        { _id: pid },
        {
          $inc: { "interactions.likes.count": 1 },
          $push: { "interactions.likes.users": uid },
        },
        { new: true }
      );

    if (data === null) {
      res
        .status(400)
        .json({ message: `tweet witch has ${uid} id is not defined` });
      return;
    }

    if (type === "INC") {
      // prep notification reqs
      req.oid = oid;
      req.pid = pid;
      req.userData = {
        username: me.username,
        avatar: me?.avatar,
        _id: me._id,
      };
      req.noteMsg = `${me.username} likes your tweet`;
      req.resData = {
        message: "You have successfully interacted with a tweet.",
        data,
      };

      next();
    }
    // res.status(200).json({ message: "you have been add/remove like from tweet successfully", data });
  } catch (error) {
    console.log(error?.message);
    if (error?.message) {
      res
        .status(500)
        .json({
          message: "Error in internal server, you may miss somthing requried",
        });
      return;
    }
  }
};

module.exports = { ToggleLike };
