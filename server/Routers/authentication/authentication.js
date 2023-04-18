const express = require('express');
const router = express.Router();
const Auth = require('../../Controllers/authentication');

router.route('/register').post(Auth.CreateAccount, Auth.Login);
router.route('/login').post(Auth.Login);

module.exports = router;