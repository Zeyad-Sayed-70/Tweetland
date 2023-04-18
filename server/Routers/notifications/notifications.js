const express = require('express');
const router = express.Router();
const protect = require('../../MiddleWares/protect');
const { GetNotification } = require('../../Controllers/notifications/getNotofocation/getNotification');

router.route('/:id').get(protect, GetNotification);

module.exports = router;