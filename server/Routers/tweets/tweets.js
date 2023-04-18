const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/tweets');
const protect = require('../../MiddleWares/protect');
const upload = require('../../Services/Gridfs');
const createNotification = require('../../MiddleWares/createNotification');

router.route('/').post(protect, Controller.GetTweets);
router.route('/fetch/:id').post(protect, Controller.GetTweet);
router.route('/create').post(protect, upload.single('file'), Controller.CreateTweet);
router.route('/like').patch(Controller.ToggleLike, createNotification);
router.route('/delete/:id').delete(protect, Controller.DeleteTweet);
router.route('/update/:id').patch(protect, Controller.EditTweet);

module.exports = router;