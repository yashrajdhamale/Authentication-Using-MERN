const express = require('express');
const router = express.Router();
const { login, register } = require('./authController.js');
const { authenticateToken, getProfile } = require('./profileController');


router.route('/login').post(login);
router.route('/register').post(register);
router.route('/profile').get(authenticateToken, getProfile);

module.exports = router;