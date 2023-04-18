const express = require('express');
const router = express.Router();
const protect = require('../../MiddleWares/protect');
const { GetMessages } = require('../../Controllers/messages/getMessages');
const { CreateMessage } = require('../../Controllers/messages/createMessage');

router.route('/').post(protect, GetMessages);
router.route('/message').post(protect, CreateMessage);

module.exports = router;