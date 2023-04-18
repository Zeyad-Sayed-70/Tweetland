const express = require('express');
const router = express.Router();
const Controller = require('../../Controllers/users/');
const protect = require('../../MiddleWares/protect');

router.route('/specific/:tagName').get(protect, Controller.GetUser);
router.route('/all').get(protect, Controller.GetUsers);
router.route('/me').get(protect, Controller.GetMyUserData);

module.exports = router;